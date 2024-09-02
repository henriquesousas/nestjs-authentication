import { Global, Module } from '@nestjs/common';
import { JwtModule as NestJwtModule, JwtService } from '@nestjs/jwt';

//TODO: Usar configservice
@Global()
@Module({
  imports: [
    NestJwtModule.register({
      global: true,
      secret: 'secret_key',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [NestJwtModule],
})
export class JwtModule {}
