import { Router } from 'express';

import { usersRoutes } from './users';
import { productsRoutes } from './products';
import { appHitsRoutes } from './app-hits';
import { authRoutes } from './auth';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/users', usersRoutes);
routes.use('/app-hits', appHitsRoutes);
routes.use('/auth', authRoutes);

export { routes };
