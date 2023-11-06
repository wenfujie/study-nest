/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Post } from '@prisma/client';
import { PageResult } from '../common/common.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: {
    skip?: number;
    take?: number;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<PageResult<Post>> {
    const { where } = query;
    const total = await this.prisma.post.count({ where });
    const items = await this.prisma.post.findMany({ ...query });
    return { items, total };
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
