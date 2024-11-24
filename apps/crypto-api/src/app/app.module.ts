import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoModule } from '../crypto/crypto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigOptions } from '@nimo/common';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfigOptions),
    CryptoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
