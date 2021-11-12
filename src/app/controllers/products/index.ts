import { Request, Response } from 'express';

import { ProductService } from '../../services/products'

class ProductController {
  private productService: ProductService;

  constructor(productServce: ProductService) {
    this.productService = productServce;
  }

  async store(req: Request, res: Response) {
    try {
      const { name, description, price } = req.body;

      this.productService.create({ name, description, price });

      return res.sendStatus(201);
    } catch {
      return res.sendStatus(500);
    }
    // async index(req: Request, res: Response) {
    //   try {
    //     const products = await ProductService.getAll();
    //     return res.json(products);
    //   } catch {
    //     return res.sendStatus(500);
    //   }
    // }

  }

  // async delete(req: Request, res: Response) {
  //   try {
  //     const { id } = req.body;

  //     await ProductService.remove(id);

  //     return res.sendStatus(200);
  //   } catch {
  //     return res.sendStatus(500);
  //   }
  // }
}

export { ProductController };
