import { Router } from 'express';

import authRouter from './auth.router';
import userRouter from './user.router';
import cardRouter from './product.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

export default router;
