import { AppHit } from '../../models/app-hit';
import { IAppHitRepository } from '../../repositories/app-hit/interface';

class ListAppHitUseCase {
  private appHitRepository: IAppHitRepository;

  constructor(appHitRepository: IAppHitRepository) {
    this.appHitRepository = appHitRepository;
  }

  async execute(): Promise<AppHit[]> {
    const appHits = await this.appHitRepository.list();
    return appHits;
  }
}

export { ListAppHitUseCase };
