import { Request, Response, NextFunction } from 'express';

import { getJwtData, ITokenPayload } from '../../common/jwt';

function authMiddleware(req: Request, res: Response, next: NextFunction) {
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

export default authMiddleware;
