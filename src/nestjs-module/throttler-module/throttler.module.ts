import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule as NestJwtModule, JwtService } from '@nestjs/jwt';
import {
  ThrottlerGuard,
  ThrottlerModule as ThrottlerModuleNestjs,
} from '@nestjs/throttler';

@Global()
@Module({
  imports: [
    ThrottlerModuleNestjs.forRoot([
      {
        ttl: 5000,
        limit: 2,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [],
})
export class ThrottlerModule {}
