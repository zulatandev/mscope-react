import { Request, Response, NextFunction } from 'express';

import LogService from '../services/log.service';
import UserService from '../services/user.service';
import { ResponseStatus } from '../shared/constants/global.constants';
import { handleError } from '../shared/utils/error';
import {
  REMOVE_FAILED,
  UPDATE_FAILED,
  USER_NOT_EXIST
} from '../shared/constants/message.constants';

export class UserController {
  private userService: UserService;
  private logService: LogService;

  constructor() {
    this.userService = new UserService();
    this.logService = new LogService();
  }

  public list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.userService.list(req.query);
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
      const user = await this.userService.create(req.body);
      res.status(201).json({
        status: ResponseStatus.SUCCESS,
        data: user
      });
    } catch (err) {
      next(err);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getById(+req.params.id);

      if (user) {
        // @ts-ignore
        if (req.user.role === 'admin' || (req.user.role === 'user' && user.id === req.user.id)) {
          // @ts-ignore
          user.logs = await this.logService.getByUserId(user.id);
        }

        res.status(200).json({
          status: ResponseStatus.SUCCESS,
          data: user
        });
      } else {
        handleError(res, 404, USER_NOT_EXIST);
      }
    } catch (err) {
      next(err);
    }
  };

  public update = async (req: Request, res: Response) => {
    const user = await this.userService.update(+req.params.id, req.body);

    if (user) {
      res.status(201).json({
        status: ResponseStatus.SUCCESS,
        data: user
      });
    } else {
      handleError(res, 400, UPDATE_FAILED);
    }
  };

  public remove = async (req: Request, res: Response) => {
    const result = await this.userService.remove(+req.params.id);

    if (result.affected === 1) {
      res.status(200).json({
        status: ResponseStatus.SUCCESS
      });
    } else {
      handleError(res, 400, REMOVE_FAILED);
    }
  };
}

export const userController = new UserController();
