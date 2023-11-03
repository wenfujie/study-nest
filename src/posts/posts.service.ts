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
import { FindAllDto, UpdatePostDto } from './dto/posts.dto';
import { PageResultPromise } from '../common/common.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  async findAll(query: FindAllDto): PageResultPromise {
    const { page = 1, pageSize = 10, title = '' } = query;
    const [items, total] = await this.postsRepository
      .createQueryBuilder('posts')
      .where('posts.title Like :title', { title: `%${title}%` })
      .take(pageSize)
      .skip(pageSize * (page - 1))
      .orderBy('posts.create_time', 'DESC')
      .getManyAndCount();

    return { items, total };
  }

  async findOne(id: string) {
    const record = await this.postsRepository.findOne({ where: { id } });
    if (!record) throw new HttpException('文章不存在', 401);
    return record;
  }

  async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
    const { title } = post;
    const doc = await this.postsRepository.findOne({ where: { title } });
    if (doc) {
      throw new HttpException('文章已存在', 401);
    }
    return await this.postsRepository.save(post);
  }

  async update(data: UpdatePostDto) {
    const { id, ...other } = data;
    await this.findOne(id);
    await this.postsRepository.update(id, other);
    return;
  }
}
