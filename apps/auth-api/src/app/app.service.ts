import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor() {
    console.log('AppService initialized ...');
  }
  
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
