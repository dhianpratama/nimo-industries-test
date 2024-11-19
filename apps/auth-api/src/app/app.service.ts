import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserRequestDto, CreateUserResponseDto, LoginRequestDto, LoginResponseDto } from '@nimo/dto';
import { UserEntity } from '@nimo/entities';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class AppService {

  constructor() {
    console.log('AppService initialized ...');
  }
  
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
