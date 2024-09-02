import { v4 as uuidv4 } from 'uuid';

export type UserConstructorProps = {
  userId?: string;
  username: string;
  password: string;
  roles?: string[];
};

export class User {
  constructor(readonly props: UserConstructorProps) {
    this.props = {
      ...props,
      userId: props.userId ?? uuidv4(),
      roles: props.roles ?? [],
    };
  }

  static create(props: UserConstructorProps): User {
    return new User(props);
  }
}
