import { Router } from 'express';
import createAppHitController from '../../use-cases/create-app-hit';
import listAppHitController from '../../use-cases/list-app-hits';
import removeAppHitController from '../../use-cases/remove-app-hit';

import { authMiddleware } from '../../middlewares/auth';

const appHitsRoutes = Router();

appHitsRoutes.post('/', (req, res) => createAppHitController.handle(req, res));
appHitsRoutes.use(authMiddleware);
appHitsRoutes.get('/', (req, res) => listAppHitController.handle(req, res));
appHitsRoutes.delete('/', (req, res) => removeAppHitController.handle(req, res));

export { appHitsRoutes };