import { Injectable } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Injectable()
export class UserConsume {
  @EventPattern('criar-user')
  async handle(@Payload() data: { message: string }) {
    console.log(`message:${data}`);
  }
}
