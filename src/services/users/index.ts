import Database from '../../database';
import { IUser, USER_COLLECTION, getObjectIdByString } from '../../database/collections';

import { hashPassword } from '../../common/crypt';

class UserService {
  convertToClient(user: IUser) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    }
  }
  async create(user: IUser) {
    const database = Database.getDatabase();
    const userCollection = database.collection<IUser>(USER_COLLECTION);

    const password = hashPassword(user.password);

    return userCollection.insertOne({ ...user, password });
  }

  async getByEmail(email: string) {
    const database = Database.getDatabase();
    const userCollection = database.collection<IUser>(USER_COLLECTION);
    return userCollection.findOne({ email });
  }

  async getAll() {
    const database = Database.getDatabase();
    const userCollection = database.collection<IUser>(USER_COLLECTION);
    const users = await userCollection.find();
    return (await users.toArray()).map(this.convertToClient);
  }

  async remove(id: string) {
    const database = Database.getDatabase();
    const userCollection = database.collection<IUser>(USER_COLLECTION);
    const objectId = getObjectIdByString(id);
    return userCollection.deleteOne({ _id: objectId });
  }
}

export default new UserService();
