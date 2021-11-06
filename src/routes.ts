import { Router } from 'express';

import UserController from './controllers/users';

const router = Router();

router.post('/users', UserController.store);

export default router;
