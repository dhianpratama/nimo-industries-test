import { Controller, forwardRef, Get, HttpCode, Inject, Param, Req, UseGuards } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { GetCryptoPriceRequestDto, GetCryptoPriceResponseDto } from '@nimo/dto'
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nimo/common';

@Controller('crypto')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AuthController {
  constructor(@Inject(forwardRef(() => CryptoService)) private readonly cryptoService: CryptoService) {}

	@Get('/price/:ticker')
	@HttpCode(200)
	async getPrice(@Param() data: GetCryptoPriceRequestDto, @Req() req): Promise<GetCryptoPriceResponseDto> {
		const user = req['admin']?.id as any;
		return this.cryptoService.getPrice(data, user)
	}
}
