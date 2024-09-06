import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@app/shared/nestjs/throttler';
import { JwtModule } from '@app/shared/nestjs/cryptography';
import { UserController } from './nestjs/user-module/user.controller';
import { USER_PROVIDE } from './nestjs/user-module/user.provider';
import { UserConsume } from './nestjs/user-module/user.consumer';
import { MyRabbitMQService } from './nestjs/user-module/rabbitmq-service';
import { RabbitMQModule } from '../../../libs/shared/src/nestjs/message-broker/rabbitmq.module';

const queues = [
  {
    providerName: 'CATS_SERVICE',
    queue: 'cats',
  },
  {
    providerName: 'CATS_SERVICE2',
    queue: 'cats2',
  },
];

@Module({
  imports: [RabbitMQModule.forQueueAsync(queues), JwtModule, ThrottlerModule],
  controllers: [UserController],
  providers: [
    UserConsume,
    MyRabbitMQService,
    ...Object.values(USER_PROVIDE.CRYPTOGRAPHY),
    ...Object.values(USER_PROVIDE.REPOSITORY),
    ...Object.values(USER_PROVIDE.SERVICE),
    ...Object.values(USER_PROVIDE.GUARD),
  ],
})
export class AppModule {}
//Tutorial
//https://medium.com/@tuzlu07x/how-to-use-rabbitmq-on-nestjs-7117865be71b
