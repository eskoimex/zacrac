import UsersController from '@controllers/users.controller';
import { AsyncRouter } from 'express-async-router';

const usersRouter = AsyncRouter();

usersRouter.post('/user', UsersController.createUserProfile);
usersRouter.get('/users', UsersController.listUserProfiles);
usersRouter.get('/user/:param', UsersController.listUserProfile);
usersRouter.put('/user/:param', UsersController.updateUserProfile);
usersRouter.delete('/user/:param', UsersController.deleteUserProfile);

export default usersRouter;
