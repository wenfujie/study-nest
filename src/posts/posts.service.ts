/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { HttpException, Injectable } from '@nestjs/common';
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

  async findOne(params: { id?: string; title?: string }) {
    const { id, title } = params;
    if (!id && !title) return;
    return await this.prisma.post.findUnique({ where: { id, title } });
  }

  async create(
    post: Pick<Post, 'title' | 'author' | 'content'>,
  ): Promise<Post> {
    const { title } = post;
    const record = await this.findOne({ title });

    if (record) throw new HttpException('文章已存在', 401);

    return await this.prisma.post.create({ data: post });
  }

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
