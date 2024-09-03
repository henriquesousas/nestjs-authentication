import { JwtService as JwtServiceNestJs } from '@nestjs/jwt';
import { Cryptography } from '../../application/cryptography/cryptography';

export class JwtService implements Cryptography {
  constructor(private readonly jwtService: JwtServiceNestJs) {}

  async encrypt(data: any): Promise<string> {
    return await this.jwtService.signAsync(data);
  }
}
