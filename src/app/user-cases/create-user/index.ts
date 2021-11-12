import { UserRepository } from '../../repositories/users';
import { CreateUserUseCase } from './create-user-use-case';
import { CreateUserController } from './create-user-controller';


function createUserController() {
  const userRepository = new UserRepository();

  const createUserUseCase = new CreateUserUseCase(userRepository);

  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
}

export default createUserController();