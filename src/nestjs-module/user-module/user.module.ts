import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtModule } from '../cryptography-module/jwt.module';
import { USER_PROVIDE } from './user.provider';

@Module({
  imports: [JwtModule],
  controllers: [UserController],
  providers: [
    ...Object.values(USER_PROVIDE.CRYPTOGRAPHY),
    ...Object.values(USER_PROVIDE.REPOSITORY),
    ...Object.values(USER_PROVIDE.SERVICE),
    ...Object.values(USER_PROVIDE.GUARD),
  ],
})
export class UserModule {}
