import { Request, Response } from 'express';

import { ListProductsUseCase } from './list-products-use-case';

class ListProductsController {
  private listProductUseCase: ListProductsUseCase;

  constructor(listProductUseCase: ListProductsUseCase) {
    this.listProductUseCase = listProductUseCase;
  }

  async handle(request: Request, response: Response) {
    const all = await this.listProductUseCase.execute();
    return response.json(all);
  }
}

export { ListProductsController };
