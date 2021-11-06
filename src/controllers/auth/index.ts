import { Request, Response } from 'express';

import UserService from '../../services/users';
import { validatePassword } from '../../common/crypt';
import { generateUserToken } from '../../common/jwt';

class AuthController {
  async authenticate(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await UserService.getUserByEmail(email);

      if (!user) {
        return res.sendStatus(401);
      }

      const isValidPassword = await validatePassword(password, user.password);

      if (!isValidPassword) {
        return res.sendStatus(401);
      }

      const token = generateUserToken(user);
      delete user.password;

      return res.json({ user, token });
    } catch {
      return res.sendStatus(500);
    }
  }
}

export default new AuthController();
