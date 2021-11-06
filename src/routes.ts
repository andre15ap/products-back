import { Router } from 'express';

import UserController from './controllers/users';
import AuthController from './controllers/auth';

import authMiddleware from './middlewares/auth';

const router = Router();

router.get('/users', authMiddleware, UserController.index);
router.post('/users', UserController.store);
router.post('/auth', AuthController.authenticate);

export default router;
