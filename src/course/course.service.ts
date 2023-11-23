/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddCourseDto, DeleteBatchDto, UpdateDto } from './course.dto';
import { PageResultPromise } from '../common/dtos';
import { Course } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: {
    skip?: number;
    take?: number;
  }): PageResultPromise<Course> {
    const total = await this.prisma.course.count({});
    const items = await this.prisma.course.findMany({
      ...query,
      orderBy: { createTime: 'desc' },
      include: { posts: true },
    });
    return { items, total };
  }

  findOne(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
      include: { posts: true },
    });
  }

  async create(data: AddCourseDto) {
    await this.prisma.course.create({ data });
  }

  async deleteBatch(ids: DeleteBatchDto['ids']) {
    await this.prisma.course.deleteMany({
      where: { id: { in: ids } },
    });
  }

  async update(data: UpdateDto) {
    const { id, ...updateData } = data;
    await this.prisma.course.update({
      where: { id },
      data: updateData,
    });
  }
}
