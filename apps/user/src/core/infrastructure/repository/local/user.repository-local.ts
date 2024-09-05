import { UseRepository } from '../../../domain/repository/use.respository';
import { User } from '../../../domain/entity/user';

export class UseRepositoryLocal implements UseRepository {
  private users: User[] = [
    User.create({
      userId: 'b76cbf56-0aa9-477f-a102-d537da55ea8e',
      username: 'user 1',
      password: '123',
      roles: ['admin'],
    }),
  ];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.props.username === username);
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
