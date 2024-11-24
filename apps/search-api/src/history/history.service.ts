import jwt from 'jsonwebtoken';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoinEnum, CoinGeckoIdEnum, CurrencyEnum, PasswordHelper, SearchStatusEnum, SqsQueue } from '@nimo/common';
import { GetCryptoPriceRequestDto, GetCryptoPriceResponseDto, GetSearchHistoryResponseDto, LoginRequestDto, LoginResponseDto } from '@nimo/dto';
import { SearchHistoryEntity, UserEntity } from '@nimo/entities';
import { Repository } from 'typeorm/repository/Repository';
import { SqsService } from '@ssut/nestjs-sqs';
import * as UUID from 'uuid';
import axios from 'axios';

@Injectable()
export class HistoryService {

  constructor(
    @InjectRepository(SearchHistoryEntity) private searchHistoryRepository: Repository<SearchHistoryEntity>,
  ) {}

  public async getSearchHistory(userId: string): Promise<GetSearchHistoryResponseDto[]> {
    const history = await this.searchHistoryRepository.find({ where: { userId } })
    return history.map((h) => GetSearchHistoryResponseDto.factory(h.searchQuery, h.result, h.status, h.createdAt))
  }
}
