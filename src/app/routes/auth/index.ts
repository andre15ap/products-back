import { Router } from 'express';

import AuthController from '../../controllers/auth';

const authRoutes = Router();

authRoutes.post('/auth', AuthController.authenticate);

export { authRoutes };
