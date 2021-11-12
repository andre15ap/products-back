import { Request, Response } from 'express';

import { RemoveUserUseCase } from './remove-user-use-case';

class RemoveUserController {
  private removeUserUseCase: RemoveUserUseCase;

  constructor(removeUserUseCase: RemoveUserUseCase) {
    this.removeUserUseCase = removeUserUseCase;
  }

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.body;

      await this.removeUserUseCase.execute(id);

      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }
}

export { RemoveUserController };