import { Request, Response, NextFunction } from 'express';

import { AppError } from '../../../errors/app-errors';
import { getJwtData } from '../../../common/jwt';
import { UserRepository } from '../../repositories/users';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError('Token missing', 401);
  }

  try {
    const token = authorization.replace('Bearer', '').trim();
    const data = getJwtData(token);
    const { id } = data;

    const userRepository = new UserRepository();
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError('User does not exists', 401);
    }
    next();
  } catch {
    // return res.json(error);
    throw new AppError('Invalid Token', 401);
  }
}
