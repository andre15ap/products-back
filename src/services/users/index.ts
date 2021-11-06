import Database from '../../database';
import { IUser, USER_COLLECTION } from '../../database/collections';

import { hashPassword } from '../../common/crypt';

class UserService {
  convertToClient(user: IUser) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    }
  }
  async createUser(user: IUser) {
    const database = Database.getDatabase();
    const collectionUser = database.collection<IUser>(USER_COLLECTION);

    const password = hashPassword(user.password);

    return collectionUser.insertOne({ ...user, password });
  }

  async getUserByEmail(email: string) {
    const database = Database.getDatabase();
    const collectionUser = database.collection<IUser>(USER_COLLECTION);
    return collectionUser.findOne({ email });
  }

  async getUsers() {
    const database = Database.getDatabase();
    const collectionUser = database.collection<IUser>(USER_COLLECTION);
    const users = await collectionUser.find();
    return (await users.toArray()).map(this.convertToClient);
  }
}

export default new UserService();
