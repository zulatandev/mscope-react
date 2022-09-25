import { Service } from 'typedi';
import {
  DeleteResult,
  getRepository,
  SelectQueryBuilder,
  UpdateResult
} from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { OrderDirection } from '../shared/constants/global.constants';
import { IListParams, IPaginatedList } from '../shared/types/base.types';

@Service()
export default class UserService {
  public async create(
    createUserData: Partial<UserEntity>
  ): Promise<UserEntity> {
    return await getRepository(UserEntity).save(createUserData);
  }

  public async getById(id: number): Promise<UserEntity> {
    return await getRepository(UserEntity).findOne(id);
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    return await getRepository(UserEntity).findOne({
      where: { email },
    });
  }

  public async list(params?: IListParams): Promise<IPaginatedList> {
    const { search, limit, order, sortBy } = params;
    const queryBuilder = getRepository(UserEntity)
      .createQueryBuilder('users')
      .select('users.*');

    if (search) {
      queryBuilder
        .where('users.email ILIKE :search')
        .setParameter('search', `%${search}%`);
    }

    const totalCount = await new SelectQueryBuilder(queryBuilder).getCount();
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));
    params.page = Math.max(0, Math.min(totalPages, params.page));

    queryBuilder
      .orderBy(
        sortBy ? `users.${sortBy}` : 'users.id',
        order ? order : OrderDirection.ASC
      )
      .offset((+params.page) * limit)
      .limit(limit);

    return {
      listData: await queryBuilder.execute(),
      sortBy,
      order,
      page: params.page,
      limit,
      totalCount,
      totalPages
    };
  }

  public async update(
    id: number,
    updateUserData: UserEntity
  ): Promise<UpdateResult> {
    return await getRepository(UserEntity).update(id, updateUserData);
  }

  public async remove(id: number): Promise<DeleteResult> {
    return await getRepository(UserEntity).delete(id);
  }
}
