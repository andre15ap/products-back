import { ObjectId, Double } from 'mongodb';

export const PRODUCT_COLLECTION = 'product';

export interface IProduct {
  _id?: ObjectId,
  name: string;
  description?: string;
  price: Double,
}
