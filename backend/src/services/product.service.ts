import { Service } from 'typedi';
import { DeleteResult, getRepository, SelectQueryBuilder, UpdateResult } from 'typeorm';
import CryptoJS from 'crypto-js';

import { OrderDirection } from '../shared/constants/global.constants';
import { IListParams, IPaginatedList } from '../shared/types/base.types';
import { ProductEntity } from '../entities/product.entity';

@Service()
export default class ProductService {
  public async create(createCardData: ProductEntity): Promise<ProductEntity> {
    return getRepository(ProductEntity).save(createCardData);
  }

  public async getById(id: number): Promise<ProductEntity> {
    return getRepository(ProductEntity).findOne(id);
  }

  public async list(params?: IListParams): Promise<IPaginatedList> {
    const { search, limit, order, sortBy } = params;
    const queryBuilder = getRepository(ProductEntity)
      .createQueryBuilder('products')
      .select('products.*');

    if (search) {
      queryBuilder
        .where('products.cardNumber ILIKE :search')
        .setParameter('search', `%${search}%`);
    }

    const totalCount = await new SelectQueryBuilder(queryBuilder).getCount();
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));
    params.page = Math.max(0, Math.min(totalPages, params.page));

    queryBuilder
      .orderBy(
        sortBy ? `products.${sortBy}` : 'products.id',
        order ? order : OrderDirection.ASC
      )
      .offset((+params.page) * limit)
      .limit(limit);

    const listData = await queryBuilder.execute();

    return {
      listData,
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
    updateCardData: Partial<ProductEntity>
  ): Promise<UpdateResult> {
    return await getRepository(ProductEntity).update(id, updateCardData);
  }

  public async remove(id: number): Promise<DeleteResult> {
    return await getRepository(ProductEntity).delete(id);
  }
}
