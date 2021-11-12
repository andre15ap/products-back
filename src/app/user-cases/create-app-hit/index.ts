import { AppHitRepository } from '../../repositories/app-hit';
import { CreateAppHitUseCase } from './create-app-hit-use-case';
import { CreateAppHitController } from './create-app-hit-controller';

function createAppHitController(): CreateAppHitController {
  const appHitRepository = new AppHitRepository();

  const createAppUitUseCase = new CreateAppHitUseCase(appHitRepository);

  const createAppHitController = new CreateAppHitController(createAppUitUseCase);

  return createAppHitController;
}

export default createAppHitController();