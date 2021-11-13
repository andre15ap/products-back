import { Request, Response } from 'express';

import { RemoveProductUseCase } from './remove-product-use-case';

class RemoveProductController {
  private removeProductUseCase: RemoveProductUseCase;

  constructor(removeProductUseCase: RemoveProductUseCase) {
    this.removeProductUseCase = removeProductUseCase;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.body;

    await this.removeProductUseCase.execute(id);

    return res.sendStatus(200);
  }
}

export { RemoveProductController };
