import { Request, Response } from 'express';

import { ListAppHitUseCase } from './list-app-hits-use-case';

class ListAppHitsController {
  private listAppHitUseCase: ListAppHitUseCase;

  constructor(listAppHitUseCase: ListAppHitUseCase) {
    this.listAppHitUseCase = listAppHitUseCase;
  }

  async handle(request: Request, response: Response) {
    const all = await this.listAppHitUseCase.execute();
    return response.json(all);
  }
}

export { ListAppHitsController };