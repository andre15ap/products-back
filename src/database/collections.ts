import { ObjectId, Double } from 'mongodb';

export const USER_COLLECTION = 'user';

export interface IUser {
  _id?: ObjectId,
  name: string;
  password: string;
  email: string;
}

export const PRODUCT_COLLECTION = 'product';

export interface IProduct {
  _id?: ObjectId,
  name: string;
  description?: string;
  price: Double,
}

export function getObjectIdByString(id: string) {
  return new ObjectId(id);
}

export function convertPriceToDouble(price: number) {
  return new Double(price);
}
