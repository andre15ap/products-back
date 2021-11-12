import { AppError } from '../../../errors/app-errors';
import { IUserRepository } from '../../repositories/users/interface';

import { validatePassword } from '../../../common/crypt';
import { generateUserToken } from '../../../common/jwt';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  id: string;
}

class AuthenticateUserUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    const isValidPassword = await validatePassword(password, user.password);

    if (!isValidPassword) {
      throw new AppError('Invalid password', 401);
    }

    const token = generateUserToken(user);
    return { token, id: user.id };
  }
}

export { AuthenticateUserUserUseCase };