import PingController from '@controllers/ping.controller';
import { NotFoundException } from '@libs/errors';
import { AsyncRouter } from 'express-async-router';
import { isAuth } from '@libs/is-auth';
import { Request, Response } from 'express';
import authRouter from './auth.route';
import usersRouter from './users.route';

const router = AsyncRouter();

// Server Health Check
router.get('/ping', PingController.ping);

//Auth Router
router.use('/api/v1/auth', authRouter);

//User Router
router.use('/api/v1', isAuth, usersRouter);

// 404 Route Not Found
router.all('*', (req: Request, res: Response) => {
  throw new NotFoundException(
    `${req.method} ${req.url} endpoint does not exist`,
  );
});

export default router;
