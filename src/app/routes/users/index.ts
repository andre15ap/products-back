import { Router } from 'express';

import createUserController from '../../use-cases/create-user';
import listUsersController from '../../use-cases/list-users';
import removeUsersController from '../../use-cases/remove-user';

import { authMiddleware } from '../../middlewares/auth';

const usersRoutes = Router();

usersRoutes.post('/', (req, res) => createUserController.handle(req, res));
usersRoutes.use(authMiddleware);
usersRoutes.get('/', (req, res) => listUsersController.handle(req, res));
usersRoutes.delete('/', (req, res) => removeUsersController.handle(req, res));

export { usersRoutes };
