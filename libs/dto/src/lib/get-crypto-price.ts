import {IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Matches, MaxLength, MinLength, NotContains} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { CoinEnum, CurrencyEnum } from '@nimo/common';

export class GetCryptoPriceRequestDto {
    @IsNotEmpty()
    @IsEnum(CoinEnum)
    ticker!: CoinEnum;

    @IsOptional()
    @IsEnum(CurrencyEnum)
    vsCurrency?: CurrencyEnum;
}

export class GetCryptoPriceResponseDto {
    @IsString()
    ticker!: string; 

	@IsString()
	price!: string;

    static factory(ticker: string, price: string): GetCryptoPriceResponseDto {
		const response = new GetCryptoPriceResponseDto();
		response.ticker = ticker;
        response.price = price;
		return response;
	}
}