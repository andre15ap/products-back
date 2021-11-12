import { Router } from 'express';
import authenticateUserController from '../user-cases/autenticate-user';


const authRoutes = Router();

authRoutes.post('/', (req, res) => authenticateUserController.handle(req, res));

export { authRoutes };