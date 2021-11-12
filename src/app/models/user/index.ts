import { v4 as uuidV4 } from 'uuid';

interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
}

class User {
  id?: string;
  name: string;
  email: string;
  password: string;

  constructor({ id, name, email, password }: IUser) {
    if (!this.id) {
      this.id = uuidV4();
    }
    this.email = email;
    this.name = name;
    this.password = password;
  }
}

export { User };
