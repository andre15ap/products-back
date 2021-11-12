import { Router } from 'express';
import authenticateUserController from '../../use-cases/autenticate-user';

const authRoutes = Router();

authRoutes.post('/', (req, res) => authenticateUserController.handle(req, res));

export { authRoutes };
