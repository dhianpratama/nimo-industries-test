import { Body, Controller, forwardRef, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserRequestDto, CreateUserResponseDto, LoginRequestDto, LoginResponseDto } from '@nimo/dto'

@Controller('auth')
export class AuthController {
  constructor(@Inject(forwardRef(() => AuthService)) private readonly authService: AuthService) {}

	@Post('/login')
	@HttpCode(200)
	async adminLogin(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
		return this.authService.login(loginDto)
	}
}
