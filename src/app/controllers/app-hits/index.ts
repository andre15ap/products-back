import { Request, Response } from 'express';

import AppHitService from '../../services/app-hits';

class AppHitController {
  async index(req: Request, res: Response) {
    try {
      const appHits = await AppHitService.getAll();
      return res.json(appHits);
    } catch {
      return res.sendStatus(500);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { namespace, value, key } = req.body;

      await AppHitService.create({ namespace, value, key });

      return res.sendStatus(201);
    } catch {
      return res.sendStatus(500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.body;

      await AppHitService.remove(id);

      return res.sendStatus(200);
    } catch {
      return res.sendStatus(500);
    }
  }
}

export default new AppHitController();
