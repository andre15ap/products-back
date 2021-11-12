import { AppHit } from '../../models/app-hit';

import { Database } from '../../../database';
import { APP_HIT_COLECTION } from '../../../database/collections';

import { ICreateAppHitDTO, IAppHitRepository } from "./interface";

class AppHitRepository implements IAppHitRepository {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  getCollection() {
    const database = this.db.getDatabase()
    return database.collection<AppHit>(APP_HIT_COLECTION);
  }

  async create({ namespace, key, value }: ICreateAppHitDTO): Promise<void> {
    const appHits = new AppHit({ namespace, key, value });

    const query = { namespace };
    const update = { $set: appHits }
    const options = { upsert: true };

    const collection = this.getCollection();
    await collection.updateOne(query, update, options)
  }

  async list(): Promise<AppHit[]> {
    const collection = this.getCollection();
    const appHits = await collection.find().toArray();
    return appHits;
  }

  async remove(id: string): Promise<void> {
    const collection = this.getCollection();
    await collection.deleteOne({ id });
  }
}

export { AppHitRepository };
