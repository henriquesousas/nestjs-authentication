import { Global, Module } from '@nestjs/common';
import { JwtModule as NestJwtModule, JwtService } from '@nestjs/jwt';

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
