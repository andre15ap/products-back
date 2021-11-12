import { Request, Response } from 'express';

import { ListUsersUseCase } from './list-users-use-case';

class ListUsersController {
  private listUsersUseCase: ListUsersUseCase;

  constructor(listUsersUseCase: ListUsersUseCase) {
    this.listUsersUseCase = listUsersUseCase;
  }

  async handle(request: Request, response: Response) {
    const all = await this.listUsersUseCase.execute();
    return response.json(all);
  }
}

export { ListUsersController };
