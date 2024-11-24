import { Controller, forwardRef, Get, HttpCode, Inject, Param, Req, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { GetCryptoPriceRequestDto, GetCryptoPriceResponseDto, GetSearchHistoryResponseDto } from '@nimo/dto'
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nimo/common';

@Controller('history')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class HistoryController {
  constructor(@Inject(forwardRef(() => HistoryService)) private readonly historyService: HistoryService) {}

	@Get('/me')
	@HttpCode(200)
	async getPrice(@Req() req): Promise<GetSearchHistoryResponseDto[]> {
		const user = req['user'];
		return this.historyService.getSearchHistory(user.id)
	}
}
