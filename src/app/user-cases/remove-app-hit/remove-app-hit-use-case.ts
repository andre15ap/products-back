import { IAppHitRepository } from '../../repositories/app-hit/interface';

class RemoveAppHitUseCase {
  private appHitRepository: IAppHitRepository;

  constructor(appHitRepository: IAppHitRepository) {
    this.appHitRepository = appHitRepository;
  }

  async execute(id: string): Promise<void> {
    await this.appHitRepository.remove(id);
  }

}

export { RemoveAppHitUseCase };