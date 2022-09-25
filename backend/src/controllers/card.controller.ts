import { Request, Response, NextFunction } from 'express';

import ProductService from '../services/product.service';
import { ResponseStatus } from '../shared/constants/global.constants';
import { handleError } from '../shared/utils/error';
import {
  CARD_NOT_EXIST,
  CARD_NUMBER_EXIST,
  REMOVE_FAILED,
  UPDATE_FAILED
} from '../shared/constants/message.constants';

export class CardController {
  private cardService: ProductService;

  constructor() {
    this.cardService = new ProductService();
  }

  public list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.cardService.list(req.query);
      res.json({
        status: ResponseStatus.SUCCESS,
        data
      });
    } catch (err) {
      next(err);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const card = await this.cardService.create(req.body);
      res.status(201).json({
        status: ResponseStatus.SUCCESS,
        data: card
      });
    } catch (err) {
      next(err);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const card = await this.cardService.getById(+req.params.id);

      if (card) {
        res.status(200).json({
          status: ResponseStatus.SUCCESS,
          data: card
        });
      } else {
        handleError(res, 404, CARD_NOT_EXIST);
      }
    } catch (err) {
      next(err);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const updatedCard = await this.cardService.update(+req.params.id, req.body);

    if (updatedCard) {
      res.status(201).json({
        status: ResponseStatus.SUCCESS,
        data: updatedCard
      });
    } else {
      handleError(res, 400, UPDATE_FAILED);
    }
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.cardService.remove(+req.params.id);

    if (result.affected === 1) {
      res.status(200).json({
        status: ResponseStatus.SUCCESS
      });
    } else {
      handleError(res, 400, REMOVE_FAILED);
    }
  };
}

export const cardController = new CardController();
