import { Router } from 'express';
import createProductController from '../user-cases/create-product';
import listProductsController from '../user-cases/list-products';
import removeProductsController from '../user-cases/remove-user';

import upload from '../middlewares/upload';
import { authMiddleware } from '../middlewares/auth';

const productsRoutes = Router();

productsRoutes.use(authMiddleware);
productsRoutes.get('/', (req, res) => listProductsController.handle(req, res));
productsRoutes.delete('/', (req, res) => removeProductsController.handle(req, res));
productsRoutes.use(upload.single('image'));
productsRoutes.post('/', (req, res) => createProductController.handle(req, res));

export { productsRoutes };
