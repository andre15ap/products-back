import { Router } from 'express';
import createProductController from '../../use-cases/create-product';
import listProductsController from '../../use-cases/list-products';
import removeProductsController from '../../use-cases/remove-user';

import upload from '../../middlewares/upload';
import { authMiddleware } from '../../middlewares/auth';

const productsRoutes = Router();

productsRoutes.use(authMiddleware);
productsRoutes.get('/', (req, res) => listProductsController.handle(req, res));
productsRoutes.delete('/', (req, res) => removeProductsController.handle(req, res));
productsRoutes.use(upload.single('image'));
productsRoutes.post('/', (req, res) => createProductController.handle(req, res));

export { productsRoutes };
