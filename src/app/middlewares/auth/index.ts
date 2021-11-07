import { Request, Response, NextFunction } from 'express';

import { getJwtData } from '../../../common/jwt';

import UserService from '../../../services/users';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  try {
    const token = authorization.replace('Bearer', '').trim();
    const data = getJwtData(token);
    const { id } = data;
    req.userId = id;
    return next();
  } catch {
    return res.sendStatus(401);
  }
}

export async function authAdminMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  try {
    const token = authorization.replace('Bearer', '').trim();
    const data = getJwtData(token);
    const { id } = data;
    const user = await UserService.getById(id);
    if (!user?.isAdmin) {
      return res.sendStatus(403);
    }
    req.userId = id;
    return next();
  } catch {
    return res.sendStatus(401);
  }
}
