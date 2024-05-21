import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getNews(): string {
    return 'Сегодня наблюдаются попытки развиваться'
  }
}
