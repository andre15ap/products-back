import { UserRepository } from '../../repositories/users/user-repository';
import { AuthenticateUserUserUseCase } from './authenticate-user-use-case';
import { AuthenticateUserController } from './authenticate-user-controller';

function authenticateUserController() {
  const userRepository = new UserRepository();

  const authenticateUserUseCase = new AuthenticateUserUserUseCase(userRepository);

  const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);

  return authenticateUserController;
}

export default authenticateUserController();
