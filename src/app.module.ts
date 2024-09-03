import { Module } from '@nestjs/common';
import { UserModule } from './nestjs-module/user-module/user.module';
import { ThrottlerModule } from './nestjs-module/throttler-module/throttler.module';

@Module({
  imports: [UserModule, ThrottlerModule],
})
export class AppModule {}
