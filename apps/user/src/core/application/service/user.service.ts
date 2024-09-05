import { User } from '../../domain/entity/user';
import { UseRepository } from '../../domain/repository/use.respository';
import { Cryptography } from '../cryptography/cryptography';
import { Hash } from '../cryptography/hash';

export type UserCreateDto = {
  username: string;
  password: string;
  roles: string[];
};

export class UseService {
  constructor(
    private repository: UseRepository,
    private cryptography: Cryptography,
    private hash: Hash,
  ) {}

  async create(dto: UserCreateDto): Promise<string> {
    const { username, password, roles } = dto;

    const passwordHashed = await this.hash.create(password);

    const user = User.create({
      username,
      password: passwordHashed,
      roles,
    });
    await this.repository.create(user);

    const payload = {
      userId: user.props.userId,
      username: user.props.username,
      roles: user.props.roles,
    };
    return await this.cryptography.encrypt(payload);
  }

  async findAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  async findOne(password: string, username: string): Promise<User> {
    const user = this.repository.findOne(username);
    const isValid = this.hash.compare(password, (await user).props.password);
    if (!isValid) {
      throw new Error('User not found');
    }
    return user;
  }
}
