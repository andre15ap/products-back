import { AppHit } from '../../models/app-hit';
import { IAppHitRepository, ICreateAppHitDTO } from './interface';

class AppHitRepositoryInMemory implements IAppHitRepository {
  appHits: AppHit[] = [];

  async create({ namespace, value, key }: ICreateAppHitDTO) {
    const appHit = new AppHit({ namespace, value, key });
    this.appHits.push(appHit);
  }

  async list() {
    return this.appHits;
  }

  async remove(id: string) {
    this.appHits = this.appHits.filter(app => app.id !== id);
  }
}

export { AppHitRepositoryInMemory };
