import Database from '../../database';
import { IUser, USER_COLLECTION } from '../../database/collections';

export async function createUser(user: IUser) {
  const database = Database.getDatabase();
  const collectionUser = database.collection<IUser>(USER_COLLECTION);
  return collectionUser.insertOne(user);
}
