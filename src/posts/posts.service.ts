/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = query;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });

    // const { page = 1, pageSize = 10, title = '' } = query;
    // const [items, total] = await this.postsRepository
    //   .createQueryBuilder('posts')
    //   .where('posts.title Like :title', { title: `%${title}%` })
    //   .take(pageSize)
    //   .skip(pageSize * (page - 1))
    //   .orderBy('posts.create_time', 'DESC')
    //   .getManyAndCount();

    // return { items, total };
  }

  // async findOne(id: string) {
  //   const record = await this.postsRepository.findOne({ where: { id } });
  //   if (!record) throw new HttpException('文章不存在', 401);
  //   return record;
  // }

  // async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
  //   const { title } = post;
  //   const doc = await this.postsRepository.findOne({ where: { title } });
  //   if (doc) {
  //     throw new HttpException('文章已存在', 401);
  //   }
  //   return await this.postsRepository.save(post);
  // }

  // async update(data: UpdatePostDto) {
  //   const { id, ...other } = data;
  //   await this.findOne(id);
  //   await this.postsRepository.update(id, other);
  //   return;
  // }

  // async deleteBatch(ids: DeleteBatchDto['ids']) {
  //   await this.postsRepository.delete(ids);
  // }
}
