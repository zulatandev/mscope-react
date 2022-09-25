import { Service } from 'typedi';
import {
  getRepository,
} from 'typeorm';

import { LogEntity } from '../entities/log.entity';

@Service()
export default class LogService {
  public async create(
    createLogData: Partial<LogEntity>
  ): Promise<LogEntity> {
    return await getRepository(LogEntity).save(createLogData);
  }

  public async getByUserId(userId: number) {
    return await getRepository(LogEntity).find({
      where: {
        userId
      }
    });
  }
}
