import { Request, Response } from 'express';
import { AppError } from '../../../errors/app-errors';

import { CreateProductUseCase } from './create-product-use-case';

class CreateProductController {
  private createProductUseCase: CreateProductUseCase;

  constructor(createProductUseCase: CreateProductUseCase) {
    this.createProductUseCase = createProductUseCase;
  }

  async handle(req: Request, res: Response) {
    const { file } = req;
    const { name, description, price } = req.body;

    if (!name) {
      throw new AppError('Name is required');
    }
    if (!price || Number(price) < 1) {
      throw new AppError('Price must be a positive integer');
    }
    if (!file) {
      throw new AppError('Image is required');
    }

    await this.createProductUseCase.execute({ name, description, price, file });

    return res.sendStatus(201);
  }
}

export { CreateProductController };
