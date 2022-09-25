import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import UserService from '../services/user.service';
import LogService from '../services/log.service';
import { IRequest } from '../shared/types/base.types';
import { Payload } from '../shared/types/auth.types';
import {
  EMAIL_EXIST,
  EXPIRED_JWT,
  INVALID_JWT,
  INVALID_REFRESH_TOKEN, LOGGED_IN,
  NOT_FOUND_USER,
  REGISTERED,
  WRONG_EMAIL_PASSWORD
} from '../shared/constants/message.constants';
import { ResponseStatus } from '../shared/constants/global.constants';
import { UserEntity } from '../entities/user.entity';
import { handleError } from '../shared/utils/error';

export class AuthController {
  private userService: UserService;
  private logService: LogService;

  constructor() {
    this.userService = new UserService();
    this.logService = new LogService();
  }

  private comparePasswords = (password, confirm) => {
    const passwordFields = password.split('$');
    const salt = passwordFields[0];
    const hash = crypto.createHmac('sha512', salt).update(confirm).digest('base64');

    return hash === passwordFields[1];
  };

  private generateToken = async (user: Payload) => {
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' });

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '3h' });

    return { accessToken, refreshToken };
  };

  public verifyJWT = (req: IRequest, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization.split(' ');

    if (authorization[0] !== 'Bearer') {
      return res.status(401).send({ message: INVALID_JWT });
    } else {
      try {
        req.user = jwt.verify(authorization[1], process.env.JWT_SECRET) as Payload;
        return next();
      } catch (error) {
        return handleError(res, 401, EXPIRED_JWT, ResponseStatus.EXPIRED_JWT);
      }
    }
  };

  public fetchMe = async (req: IRequest, res: Response, next: NextFunction) => {
    const me = await this.userService.findByEmail(req.user.email);

    if (me) {
      res.status(200).send({
        status: ResponseStatus.SUCCESS,
        data: {
          email: me.email,
          firstName: me.firstName,
          lastName: me.lastName,
          phoneNumber: me.phoneNumber,
          role: me.role
        }
      });
    } else {
      res.status(200).send({
        status: ResponseStatus.FAILED,
        message: NOT_FOUND_USER,
      });
    }
  };

  public login = async (req: IRequest, res: Response, next: NextFunction) => {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return res.status(404).send({
        status: ResponseStatus.INVALID_EMAIL_PASSWORD,
        message: WRONG_EMAIL_PASSWORD,
      });
    } else {
      if (this.comparePasswords(user.password, password)) {
        const tokens = await this.generateToken({ id: user.id, email: user.email, role: user.role });
        await this.logService.create({
          userId: user.id,
          browserAgent: req.headers['user-agent'],
          ipAddress: req.headers.origin
        });

        res.status(201).send({
          status: ResponseStatus.SUCCESS,
          message: LOGGED_IN,
          data: {
            tokens,
            user: {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              phoneNumber: user.phoneNumber,
              role: user.role
            }
          }
        });
      } else {
        return res.status(400).send({
          status: ResponseStatus.INVALID_EMAIL_PASSWORD,
          message: WRONG_EMAIL_PASSWORD,
        });
      }
    }
  };

  public register = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const { email, password, firstName, lastName, phoneNumber } = req.body;

      const exist = await this.userService.findByEmail(email);

      if (exist) {
        return res.status(400).send({ message: EMAIL_EXIST });
      }

      const salt = crypto.randomBytes(16).toString('base64');
      const hash = crypto.createHmac('sha512', salt).update(password).digest('base64');

      const user: Partial<UserEntity> = {
        email,
        password: salt + '$' + hash,
        firstName,
        lastName,
        phoneNumber,
        verified: true,
        role: 'user'
      };

      console.log(user);

      await this.userService.create(user);

      res.status(201).send({
        status: ResponseStatus.SUCCESS,
        message: REGISTERED,
      });
    } catch (error) {
      res.status(400).send({ error: error });
    }
  };

  public refresh = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const user = jwt.verify(req.body.refreshToken, process.env.JWT_SECRET) as Payload;

      const tokens = await this.generateToken(user);

      return res.status(201).send(tokens);
    } catch (error) {
      return res.status(400).send({ message: INVALID_REFRESH_TOKEN });
    }
  }
}

export const authController = new AuthController();
