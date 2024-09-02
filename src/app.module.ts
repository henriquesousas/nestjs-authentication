import { Module } from '@nestjs/common';
import { UserModule } from './nestjs-module/user-module/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
