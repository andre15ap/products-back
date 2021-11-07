import Database from '../../database';

import { IAppHits, APP_HIT_COLECTION } from '../../database/collections/app-hits';

class AppHitService {
  getCollection() {
    const database = Database.getDatabase();
    return database.collection<IAppHits>(APP_HIT_COLECTION);
  }

  convertToClient(appHit: IAppHits) {
    return {
      id: appHit._id,
      namespace: appHit.namespace,
      key: appHit.key,
      value: appHit.value,
    }
  }

  async create(appHit: IAppHits) {
    const collection = this.getCollection();

    const { namespace } = appHit;

    const query = { namespace };
    const update = { $set: appHit }
    const options = { upsert: true };

    return collection.updateOne(query, update, options);
  }

  async getAll() {
    const collection = this.getCollection();
    const appHits = await collection.find();
    return (await appHits.toArray()).map(this.convertToClient);
  }

  async remove(id: string) {
    const collection = this.getCollection();
    const objectId = Database.getObjectIdByString(id);
    return collection.deleteOne({ _id: objectId });
  }
}

export default new AppHitService();
