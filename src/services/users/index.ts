import Database from '../../database';
import { IUser, USER_COLLECTION } from '../../database/collections/user';

import { hashPassword } from '../../common/crypt';

class UserService {
  convertToClient(user: IUser) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    }
  }

  getCollection() {
    const database = Database.getDatabase();
    return database.collection<IUser>(USER_COLLECTION);
  }

  async create(user: IUser) {
    const collection = this.getCollection();

    const password = hashPassword(user.password);

    return collection.insertOne({ ...user, password });
  }

  async createAdmin(user: IUser) {
    const collection = this.getCollection();

    const password = hashPassword(user.password);

    return collection.insertOne({ ...user, password, isAdmin: true });
  }

  async getByEmail(email: string) {
    const collection = this.getCollection();
    return collection.findOne({ email });
  }

  async getById(id: string) {
    const collection = this.getCollection();

    const objectId = Database.getObjectIdByString(id);
    return collection.findOne({ _id: objectId });
  }

  async getAll() {
    const collection = this.getCollection();
    const users = await collection.find();
    return (await users.toArray()).map(this.convertToClient);
  }

  async remove(id: string) {
    const collection = this.getCollection();
    const objectId = Database.getObjectIdByString(id);
    return collection.deleteOne({ _id: objectId });
  }
}

export default new UserService();
