import { Request, Response } from 'express';

import UserService from '../../services/users';

class UserController {
  async store(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const userExists = await UserService.getUserByEmail(email);

      if (userExists) {
        return res.sendStatus(409);
      }

      await UserService.createUser({ name, email, password });

      return res.sendStatus(201);
    } catch {
      console.log('deu erro');
      return res.sendStatus(500);
    }
  }
}

export default new UserController();
