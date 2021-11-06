import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUser } from '../../database/collections';

export interface ITokenPayload {
  id: string;
  iat: string;
  exp: string;
}

export function generateUserToken(user: IUser) {
  dotenv.config();

  const SECRET_TOKEN = process.env.SECRET_TOKEN as string;

  return jwt.sign({ id: user._id }, SECRET_TOKEN, { expiresIn: '1d' });
}

export function getJwtData(token: string): ITokenPayload {
  dotenv.config();

  const SECRET_TOKEN = process.env.SECRET_TOKEN;

  const decoded: any = jwt.verify(token, SECRET_TOKEN);
  return decoded;
}

