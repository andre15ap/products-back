import { UserRepository } from '../../repositories/users/user-repository';
import { ListUsersUseCase } from './list-users-use-case';
import { ListUsersController } from './list-users-controller';

function listUsersController() {
  const userRepository = new UserRepository();

  const listUsersUseCase = new ListUsersUseCase(userRepository);

  const listUsersController = new ListUsersController(listUsersUseCase);

  return listUsersController;
}

export default listUsersController();
