import { Request, Response } from 'express';

import UserService from '../../../services/users';

class UserController {
  async index(req: Request, res: Response) {
    try {
      const users = await UserService.getAll();
      return res.json(users);
    } catch {
      return res.sendStatus(500);
    }
  }
  async store(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const userExists = await UserService.getByEmail(email);

      if (userExists) {
        return res.sendStatus(409);
      }

      await UserService.create({ name, email, password });

      return res.sendStatus(201);
    } catch {
      return res.sendStatus(500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.body;

      await UserService.remove(id);

      return res.sendStatus(200);
    } catch {
      return res.sendStatus(500);
    }
  }
}

export default new UserController();
