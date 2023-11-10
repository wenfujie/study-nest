/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Post } from '@prisma/client';
import { PageResultPromise } from '../common/common.dto';
import { CreatePostDto, DeleteBatchDto, UpdatePostDto } from './posts.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: {
    skip?: number;
    take?: number;
  }): PageResultPromise<Post> {
    const total = await this.prisma.post.count({});
    const items = await this.prisma.post.findMany({
      ...query,
      orderBy: {
        createTime: 'desc',
      },
    });
    return { items, total };
  }

  async findOne(postId: number) {
    return await this.prisma.post.findUnique({ where: { id: postId } });
  }

  async create(data: CreatePostDto) {
    await this.prisma.post.create({ data });
  }

  async update(data: UpdatePostDto) {
    const { id, ...postData } = data;
    const record = await this.findOne(id);
    if (!record) throw new HttpException('文章不存在', 401);

    return this.prisma.post.update({ where: { id }, data: postData });
  }

  deleteBatch(ids: DeleteBatchDto['ids']) {
    return this.prisma.post.deleteMany({
      where: { id: { in: ids } },
    });
  }

  deleteAll() {
    return this.prisma.post.deleteMany({});
  }
}
