import Database from '../../database';
import { IUser, USER_COLLECTION } from '../../database/collections';

import { hashPassword } from '../crypt';


class UserService {
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
}

export default new UserService();
