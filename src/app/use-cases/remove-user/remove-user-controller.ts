import { Request, Response } from 'express';

import { RemoveUserUseCase } from './remove-user-use-case';

class RemoveUserController {
  private removeUserUseCase: RemoveUserUseCase;

  constructor(removeUserUseCase: RemoveUserUseCase) {
    this.removeUserUseCase = removeUserUseCase;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.body;

    await this.removeUserUseCase.execute(id);

    return res.sendStatus(200);
  }
}

export { RemoveUserController };