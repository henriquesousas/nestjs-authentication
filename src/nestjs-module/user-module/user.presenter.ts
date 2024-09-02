import { User } from '../../core/domain/entity/user';

export type UsersOutput = {
  userId: string;
  username: string;
  roles: string[];
  password: string;
};

export class UserPresenter {
  static toJsonArray(users: User[]): UsersOutput[] {
    const data = users.map((user) => {
      return {
        userId: user.props.userId,
        username: user.props.username,
        password: user.props.password,
        roles: user.props.roles,
      };
    });
    return data;
  }

  static toJson(user: User): UsersOutput {
    return {
      userId: user.props.userId,
      username: user.props.username,
      password: user.props.password,
      roles: user.props.roles,
    };
  }
}
