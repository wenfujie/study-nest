/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsEntity } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  async findAll(query = { pageNum: 1, pageSize: 10 }) {
    const db = this.postsRepository.createQueryBuilder('posts');
    db.where('1 = 1');
    db.orderBy('posts.create_time', 'DESC');

    const total = await db.getCount();
    const { pageNum, pageSize } = query;
    db.limit(pageSize);
    db.offset(pageSize * (pageNum - 1));

    const items = await db.getMany();

    return { items, total };
  }

  async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
    const { title } = post;
    const doc = await this.postsRepository.findOne({ where: { title } });
    if (doc) {
      throw new HttpException('文章已存在', 401);
    }
    return await this.postsRepository.save(post);
  }
}
