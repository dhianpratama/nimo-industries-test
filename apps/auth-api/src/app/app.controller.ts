import { Body, Controller, forwardRef, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserRequestDto, CreateUserResponseDto, LoginRequestDto, LoginResponseDto } from '@nimo/dto'

@Controller()
export class AppController {
  constructor(@Inject(forwardRef(() => AppService)) private readonly appService: AppService) {}

	@Get('/test')
	test() {
		return this.appService.getData();
	}
}
