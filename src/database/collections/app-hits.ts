import { ObjectId } from 'mongodb';

export const APP_HIT_COLECTION = 'apphit';

export interface IAppHits {
  _id?: ObjectId;
  namespace: string;
  key?: string;
  value: number;
}
