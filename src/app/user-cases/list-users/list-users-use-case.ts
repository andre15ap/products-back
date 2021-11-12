import { User } from '../../models/user';
import { IUserRepository } from '../../repositories/users/interface';

class ListUsersUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(): Promise<User[]> {
    const users = await this.userRepository.list();
    return users;
  }
}

export { ListUsersUseCase };
