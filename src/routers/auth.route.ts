import AuthController from '@controllers/auth.controller';
import { AsyncRouter } from 'express-async-router';

const authRouter = AsyncRouter();

authRouter.post('/login', AuthController.login);
authRouter.post('/signup', AuthController.signup);

export default authRouter;
