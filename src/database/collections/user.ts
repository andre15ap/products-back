import { ObjectId } from 'mongodb';

export const USER_COLLECTION = 'user';

export interface IUser {
  _id?: ObjectId,
  name: string;
  password: string;
  email: string;
  isAdmin?: boolean;
}
