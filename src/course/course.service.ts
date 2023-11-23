/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  AddCourseDto,
  AuthCoursesDto,
  DeleteBatchDto,
  UpdateDto,
} from './course.dto';
import { PageResultPromise } from '../common/dtos';
import { Course } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: {
    userId: string;
    skip?: number;
    take?: number;
  }): PageResultPromise<Course> {
    const { userId, ...queryParam } = query;
    const courses = await this.prisma.coursesOnUsers.findMany({
      where: { userId },
      select: {
        course: {
          include: { posts: true },
        },
      },
      orderBy: { course: { createTime: 'desc' } },
      ...queryParam,
    });
    const items = courses.map(({ course }) => course);
    return { items, total: 0 };
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

  async authCourses(data: AuthCoursesDto) {
    const { courseIds, userId } = data;
    const courseObjIds = courseIds.map((courseId) => ({ courseId }));

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        CoursesOnUsers: {
          createMany: { data: courseObjIds },
        },
      },
    });
  }
}
