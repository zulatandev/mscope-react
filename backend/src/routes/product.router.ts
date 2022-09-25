import { Router } from 'express';

import { validate } from '../middlewares/validation.middleware';
import { cardController } from '../controllers/card.controller';
import * as cardValidation from '../shared/validations/product.validation';

const router = Router();

router.post('/', validate(cardValidation.create), cardController.create);
router.get('/', validate(cardValidation.list), cardController.list);
router.put('/:id', validate(cardValidation.update), cardController.update);
router.get('/:id', validate(cardValidation.id), cardController.getById);
router.delete('/:id', validate(cardValidation.id), cardController.remove);

export default router;
