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
    message!: string

    static factory(ticker: string): GetCryptoPriceResponseDto {
		const response = new GetCryptoPriceResponseDto();
		response.message = `${ticker.toUpperCase()} price will be sent to your email.`
		return response;
	}
}