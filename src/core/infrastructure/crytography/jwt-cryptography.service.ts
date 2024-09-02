import { JwtService } from '@nestjs/jwt';
import { Cryptography } from '../../application/cryptography/cryptography';

export class JwtCryptographyService implements Cryptography {
  constructor(private readonly jwtService: JwtService) {}

  async encrypt(data: any): Promise<string> {
    return await this.jwtService.signAsync(data);
  }
}
