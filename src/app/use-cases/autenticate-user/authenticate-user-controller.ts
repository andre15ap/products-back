import { Request, Response } from 'express';

import { AuthenticateUserUserUseCase } from './authenticate-user-use-case';

class AuthenticateUserController {
  private authenticateUserUseCase: AuthenticateUserUserUseCase;

  constructor(authenticateUserUseCase: AuthenticateUserUserUseCase) {
    this.authenticateUserUseCase = authenticateUserUseCase;
  }

  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const response = await this.authenticateUserUseCase.execute({ email, password });

      return res.json(response);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }
}

export { AuthenticateUserController };