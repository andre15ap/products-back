import { Request, Response } from 'express';
import { AppError } from '../../../errors/app-errors';

import { CreateAppHitUseCase } from './create-app-hit-use-case';

class CreateAppHitController {
  private createAppHitUseCase: CreateAppHitUseCase;

  constructor(createAppHitUseCase: CreateAppHitUseCase) {
    this.createAppHitUseCase = createAppHitUseCase;
  }

  async handle(req: Request, res: Response) {
    const { namespace, key, value } = req.body;
    if (!namespace) {
      throw new AppError('Namespace is required');
    }
    if (!value || Number(value) < 1) {
      throw new AppError('Value must be a positive integer');
    }

    this.createAppHitUseCase.execute({ namespace, key, value: Number(value) });
    return res.sendStatus(201);
  }
}

export { CreateAppHitController };
