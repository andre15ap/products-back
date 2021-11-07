import { Router } from 'express';

import UserController from '../controllers/users';
import ProductController from '../controllers/products';
import AppHitController from '../controllers/app-hits';
import AuthController from '../controllers/auth';

import { authMiddleware, authAdminMiddleware } from '../middlewares/auth';
import upload from '../middlewares/upload';

const router = Router();

router.get('/users', authAdminMiddleware, UserController.index);
router.post('/users', UserController.store);
router.delete('/users', authAdminMiddleware, UserController.delete);

router.get('/products', authMiddleware, ProductController.index);
router.post('/products', authAdminMiddleware, upload.single('image'), ProductController.store);
router.delete('/products', authAdminMiddleware, ProductController.delete);

router.get('/app-hits', authMiddleware, AppHitController.index);
router.post('/app-hits', authMiddleware, AppHitController.store);
router.delete('/app-hits', authAdminMiddleware, AppHitController.delete);

router.post('/auth', AuthController.authenticate);

export default router;
