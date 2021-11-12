import { Request, Response } from 'express';

import { RemoveAppHitUseCase } from './remove-app-hit-use-case';

class RemoveAppHitsController {
  private removeAppHitUseCase: RemoveAppHitUseCase;

  constructor(removeAppHitUseCase: RemoveAppHitUseCase) {
    this.removeAppHitUseCase = removeAppHitUseCase;
  }

  async handle(request: Request, response: Response) {
    const { id } = request.body;
    await this.removeAppHitUseCase.execute(id);
    return response.sendStatus(200);
  }
}

export { RemoveAppHitsController };