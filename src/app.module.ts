import { Module } from '@nestjs/common';
import { UserModule } from './nestjs-module/user-module/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    ThrottlerModule.forRoot([
      {
        ttl: 5000,
        limit: 2,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
