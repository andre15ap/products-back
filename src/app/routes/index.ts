import { Router } from 'express';

import UserController from '../controllers/users';
import ProductController from '../controllers/products';
import AppHitController from '../controllers/app-hits';
import AuthController from '../controllers/auth';

import authMiddleware from '../middlewares/auth';

const router = Router();

router.get('/users', authMiddleware, UserController.index);
router.delete('/users', authMiddleware, UserController.delete);
router.post('/users', UserController.store);

router.get('/products', authMiddleware, ProductController.index);
router.post('/products', authMiddleware, ProductController.store);
router.delete('/products', authMiddleware, ProductController.delete);

router.get('/app-hits', authMiddleware, AppHitController.index);
router.post('/app-hits', authMiddleware, AppHitController.store);
router.delete('/app-hits', authMiddleware, AppHitController.delete);

router.post('/auth', AuthController.authenticate);

export default router;
