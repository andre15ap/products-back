import { AppHitRepository } from '../../repositories/app-hit/app-hit-repository';
import { ListAppHitUseCase } from './list-app-hits-use-case';
import { ListAppHitsController } from './list-app-hits-controller';

function listAppHitController(): ListAppHitsController {
  const appHitRepository = new AppHitRepository();

  const listAppHitUseCase = new ListAppHitUseCase(appHitRepository);

  const listAppHitController = new ListAppHitsController(listAppHitUseCase);

  return listAppHitController;
}

export default listAppHitController();