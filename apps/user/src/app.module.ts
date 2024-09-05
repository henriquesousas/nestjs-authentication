import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@app/shared/nestjs/throttler';
import { JwtModule } from '../../../libs/shared/src/nestjs/cryptography';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './nestjs/user-module/user.controller';
import { USER_PROVIDE } from './nestjs/user-module/user.provider';

@Module({
  imports: [
    JwtModule,
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@rabbitmq:5672'],
          queue: 'user_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),

    ThrottlerModule,
  ],
  controllers: [UserController],
  providers: [
    ...Object.values(USER_PROVIDE.CRYPTOGRAPHY),
    ...Object.values(USER_PROVIDE.REPOSITORY),
    ...Object.values(USER_PROVIDE.SERVICE),
    ...Object.values(USER_PROVIDE.GUARD),
  ],
})
export class AppModule {}
