import jwt from 'jsonwebtoken';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordHelper } from '@nimo/common';
import { LoginRequestDto, LoginResponseDto } from '@nimo/dto';
import { UserEntity } from '@nimo/entities';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  async login(data: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOne({ where: { email: data.email } });
    if (!user) {
      throw new HttpException('Invalid email / password', HttpStatus.FORBIDDEN);
    }

    const isPasswordMatch = await PasswordHelper.comparePassword(data.password, user.password);
    if (!isPasswordMatch) {
      throw new HttpException('Invalid email / password', HttpStatus.FORBIDDEN);
    }

    const accessToken = jwt.sign({
			id: user.id,
      email: user.email,
		}, process.env.JWT_SECRET_KEY, {
      expiresIn: '24h'
		});

    return LoginResponseDto.factory(accessToken)
  }
}
