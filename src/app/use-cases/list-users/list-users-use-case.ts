import { User } from '../../models/user';
import { IUserRepository } from '../../repositories/users/interface';

interface IResponseUser {
  id: string;
  name: string;
  email: string;
}
class ListUsersUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  toClient(users: User[]): IResponseUser[] {
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  }

  async execute(): Promise<IResponseUser[]> {
    const users = await this.userRepository.list();
    return this.toClient(users);
  }
}

export { ListUsersUseCase };
