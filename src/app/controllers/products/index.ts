import { Request, Response } from 'express';

import ProductService from '../../../services/products';

class ProductController {
  async index(req: Request, res: Response) {
    try {
      const products = await ProductService.getAll();
      return res.json(products);
    } catch {
      return res.sendStatus(500);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { file } = req;
      const { name, description, price } = req.body;

      await ProductService.create({ name, description, price }, file);

      return res.sendStatus(201);
    } catch {
      return res.sendStatus(500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.body;

      await ProductService.remove(id);

      return res.sendStatus(200);
    } catch {
      return res.sendStatus(500);
    }
  }
}

export default new ProductController();
