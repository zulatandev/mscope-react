import { Router } from 'express';

import { userController } from '../controllers/user.controller';
import { validate } from '../middlewares/validation.middleware';
import * as userValidation from '../shared/validations/user.validation';
import { authenticate } from '../middlewares/authentication.middleware';

const userRouter = Router();

userRouter.post('/', validate(userValidation.create), userController.create);
userRouter.get('/', validate(userValidation.list), userController.list);
userRouter.get('/:id', validate(userValidation.id), authenticate, userController.getById);
userRouter.put('/:id', validate(userValidation.update), userController.update);
userRouter.delete('/:id', validate(userValidation.id), userController.remove);

export default userRouter;
