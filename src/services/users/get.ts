import Database from '../../database';
import { IUser, USER_COLLECTION } from '../../database/collections';

export async function getUserByEmail(email: string) {
  const database = Database.getDatabase();
  const collectionUser = database.collection<IUser>(USER_COLLECTION);
  return collectionUser.findOne({ email });
}
