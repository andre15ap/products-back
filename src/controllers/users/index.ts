import { Request, Response } from 'express';

import UserService from '../../services/users';

class UserController {
  async index(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      return res.json(users);
    } catch {
      return res.sendStatus(500);
    }
  }
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
      return res.sendStatus(500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.body;

      await UserService.removeUser(id);

      return res.sendStatus(200);
    } catch {
      return res.sendStatus(500);
    }
  }
}

export default new UserController();
