import { Request, Response } from 'express';
import { AppError } from '../../../errors/app-errors';

import { CreateUserUseCase } from './create-user-use-case';

class CreateUserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;
    if (!name) {
      throw new AppError('Name is required');
    }
    if (!email) {
      throw new AppError('Email is required');
    }
    if (!password) {
      throw new AppError('Password is required');
    }
    await this.createUserUseCase.execute({ name, email, password });
    return res.sendStatus(201);
  }
}

export { CreateUserController };
