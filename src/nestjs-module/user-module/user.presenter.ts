import { User } from '../../core/domain/entity/user';

export type UsersOutput = {
  userId: string;
  username: string;
  roles: string[];
};

export class UserPresenter {
  static toJsonArray(users: User[]): UsersOutput[] {
    const data = users.map((user) => {
      return {
        userId: user.props.userId,
        username: user.props.username,
        roles: user.props.roles,
      };
    });
    return data;
  }
}
