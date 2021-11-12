import { ICreateUserDTO, IUserRepository } from '../../repositories/users/interface';

class RemoveUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: string) {
    await this.userRepository.remove(id);
  }
}

export { RemoveUserUseCase };