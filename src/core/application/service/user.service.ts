import { User } from '../../domain/entity/user';
import { UseRepository } from '../../domain/repository/use.respository';
import { Cryptography } from '../cryptography/cryptography';

export type UserCreateDto = {
  username: string;
  password: string;
  roles: string[];
};

export class UseService {
  constructor(
    private repository: UseRepository,
    private cryptography: Cryptography,
  ) {}

  async create(dto: UserCreateDto): Promise<string> {
    const user = User.create({
      username: dto.username,
      password: dto.password,
      roles: dto.roles,
    });
    await this.repository.create(user);

    const payload = {
      userId: user.props.userId,
      username: user.props.username,
      roles: user.props.roles,
    };
    return await this.cryptography.encrypt(payload);
  }

  async getAll(): Promise<User[]> {
    return this.repository.findAll();
  }
}
