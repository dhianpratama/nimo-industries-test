import jwt from 'jsonwebtoken';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoinEnum, CoinGeckoIdEnum, CurrencyEnum, PasswordHelper, SearchStatusEnum, SqsQueue } from '@nimo/common';
import { GetCryptoPriceRequestDto, GetCryptoPriceResponseDto, LoginRequestDto, LoginResponseDto } from '@nimo/dto';
import { SearchHistoryEntity, UserEntity } from '@nimo/entities';
import { Repository } from 'typeorm/repository/Repository';
import { SqsService } from '@ssut/nestjs-sqs';
import * as UUID from 'uuid';
import axios from 'axios';

@Injectable()
export class CryptoService {

  constructor(
    @InjectRepository(SearchHistoryEntity) private searchHistoryRepository: Repository<SearchHistoryEntity>,
    @Inject(forwardRef(() => SqsService)) private readonly sqsService: SqsService
  ) {}

  private async getPriceFromCoinGecko(coinSymbol: CoinEnum, vsCurrency: CurrencyEnum = CurrencyEnum.AUD) {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      headers: {
        'x-cg-demo-api-key': process.env["COINGECKO_API_KEY"]
      },
      params: {
        ids: CoinGeckoIdEnum[coinSymbol],
        vs_currencies: vsCurrency
      },
     });
    
    const data = response.data;
    return data[CoinGeckoIdEnum[coinSymbol]]?.[vsCurrency]
  }

  private async sendEmailToSqs(to: string, data: Record<string, any>) {
    await this.sqsService.send(SqsQueue.Email, {
      id: UUID.v4(),
      body: {
        email: to,
        ...data
      },
      delaySeconds: 0,
    });
  }

  private async saveNewHistory(userId: string, ticker: CoinEnum, vsCurrency: CurrencyEnum): Promise<string> {
    const historyEntity = new SearchHistoryEntity();
    historyEntity.userId = userId;
    historyEntity.searchQuery = `${ticker} to ${vsCurrency}`;
    historyEntity.status = SearchStatusEnum.SUBMITTED;
    historyEntity.result = 0;
    const history = await this.searchHistoryRepository.save(historyEntity);
    return history.id;
  }

  private async updateHistory(historyId: string, data: Partial<SearchHistoryEntity>) {
    await this.searchHistoryRepository.update({ id: historyId }, data)
  }

  public async getPrice(data: GetCryptoPriceRequestDto, user: any){
    try {
      const historyId = await this.saveNewHistory(user.id, data.ticker, data.vsCurrency);
      const price = await this.getPriceFromCoinGecko(data.ticker, data.vsCurrency)
      await this.updateHistory(historyId, { result: price, status: SearchStatusEnum.PRICE_FETCHED })
      await this.sendEmailToSqs(user.email, {
        ticker: data.ticker,
        vsCurrency: data.vsCurrency,
        price,
        timestamp: new Date(),
        historyId
      })
      await this.updateHistory(historyId, { status: SearchStatusEnum.EMAIL_SENT_TO_QUEUE })
    } catch (err) {
      Logger.error(err)
      throw err
    }
  }
}
