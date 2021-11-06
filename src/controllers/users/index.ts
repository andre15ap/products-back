import { Request, Response } from 'express';

import { createUser } from '../../services/users/create';
import { getUserByEmail } from '../../services/users/get';

class UserController {
  async store(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const userExists = await getUserByEmail(email);

      if (userExists) {
        return res.sendStatus(409);
      }

      const user = await createUser({ name, email, password });

      return res.json(user);
    } catch {
      console.log('deu erro');
      return res.sendStatus(500);
    }
  }
}

export default new UserController();
