import { Router } from 'express';

import { authController } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/authentication.middleware';

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.post('/refresh', authController.refresh);
authRouter.get('/me', authenticate, authController.fetchMe);

export default authRouter;
