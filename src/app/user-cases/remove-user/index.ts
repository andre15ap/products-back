import { UserRepository } from '../../repositories/users';
import { RemoveUserUseCase } from './remove-user-use-case';
import { RemoveUserController } from './remove-user-controller';


function removeUserController() {
  const userRepository = new UserRepository();

  const removeUserUseCase = new RemoveUserUseCase(userRepository);

  const removeUserController = new RemoveUserController(removeUserUseCase);

  return removeUserController;
}

export default removeUserController();