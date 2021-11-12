import { AppHitRepository } from '../../repositories/app-hit';
import { RemoveAppHitUseCase } from './remove-app-hit-use-case';
import { RemoveAppHitsController } from './remove-app-hit-controller';

function removeAppHitController(): RemoveAppHitsController {
  const appHitRepository = new AppHitRepository();

  const removeAppHitUseCase = new RemoveAppHitUseCase(appHitRepository);

  const removeAppHitController = new RemoveAppHitsController(removeAppHitUseCase);

  return removeAppHitController;
}

export default removeAppHitController();
