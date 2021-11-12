import { AppError } from '../../../errors/app-errors';
import { ICreateUserDTO, IUserRepository } from '../../repositories/users/interface';

class CreateUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }
    await this.userRepository.create({ name, email, password });
  }
}

export { CreateUserUseCase };