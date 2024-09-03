import { Hash } from '../../application/cryptography/hash';
import * as bcrypt from 'bcrypt';

export class BCryptService implements Hash {
  constructor(private readonly salt: number = 12) {}

  async create(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
