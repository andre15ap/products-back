import { Router } from 'express';

import AppHitController from '../../controllers/app-hits';

import { authMiddleware, authAdminMiddleware } from '../../middlewares/auth';

const appHitsRoutes = Router();

appHitsRoutes.get('/app-hits', authMiddleware, AppHitController.index);
appHitsRoutes.post('/app-hits', authMiddleware, AppHitController.store);
appHitsRoutes.delete('/app-hits', authAdminMiddleware, AppHitController.delete);

export { appHitsRoutes };
