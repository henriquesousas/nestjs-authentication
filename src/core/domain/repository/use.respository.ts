import { User } from '../entity/user';

export interface UseRepository {
  create(user: User): Promise<void>;
  findAll(): Promise<User[]>;
  findOne(username: string): Promise<User | undefined>;
}
