import jwt from 'jsonwebtoken';
import { IUser } from '../../database/collections';

export interface ITokenPayload {
  id: string;
  iat: string;
  exp: string;
}

export function generateUserToken(user: IUser) {

  const SECRET_TOKEN = process.env.SECRET_TOKEN as string;

  return jwt.sign({ id: user._id }, SECRET_TOKEN, { expiresIn: '1d' });
}

export function getJwtData(token: string): ITokenPayload {

  const SECRET_TOKEN = process.env.SECRET_TOKEN;

  const decoded: any = jwt.verify(token, SECRET_TOKEN);
  return decoded;
}

