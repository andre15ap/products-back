import { ICreateAppHitDTO, IAppHitRepository } from '../../repositories/app-hit/interface';

class CreateAppHitUseCase {
  private apphitRepository: IAppHitRepository;

  constructor(apphitRepository: IAppHitRepository) {
    this.apphitRepository = apphitRepository;
  }

  execute({ namespace, key, value }: ICreateAppHitDTO): void {
    this.apphitRepository.create({ namespace, key, value });
  }
}

export { CreateAppHitUseCase };
