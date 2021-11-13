import { User } from '../../models/user';
import { ICreateUserDTO, IUserRepository } from './interface';

class UserRepositoryInMemory implements IUserRepository {
  users: User[] = [];

  async findByEmail(email: string) {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string) {
    return this.users.find(user => user.id === id);
  }

  async create({ name, email, password }: ICreateUserDTO) {
    const user = new User({ name, email, password });
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  async remove(id: string) {
    this.users = this.users.filter(user => user.id !== id);
  }
}

export { UserRepositoryInMemory };
