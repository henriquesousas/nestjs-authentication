import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ThrottlerModule } from '@app/shared/nestjs/throttler';
import { JwtModule } from '@app/shared/nestjs/cryptography';
import { UserController } from './nestjs/user-module/user.controller';
import { USER_PROVIDE } from './nestjs/user-module/user.provider';
import { UserConsume } from './nestjs/user-module/user.consumer';
import { MyRabbitMQService } from './nestjs/user-module/rabbitmq/rabbitmq-service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CATS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@rabbitmq:5672'],
          queue: 'cats',
        },
      },
      {
        name: 'CATS_SERVICE2',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@rabbitmq:5672'],
          queue: 'cats2',
        },
      },
    ]),
    JwtModule,
    ThrottlerModule,
  ],
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
