/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddTypeDto } from './menu-item.dto';

@Injectable()
export class MenuItemService {
  constructor(private readonly prisma: PrismaService) {}

  // 获取分类下的课程列表
  async getCourseList(menuId: number) {
    const { course } = await this.prisma.menuItem.findUnique({
      where: { id: menuId },
      select: {
        course: true,
      },
    });
    return course;
  }

  // 添加课程
  async addCourses(data: AddTypeDto) {
    const { courseIds, menuId } = data;
    const objCourseIds = courseIds.map((id) => ({ id }));

    await this.prisma.menuItem.update({
      where: { id: menuId },
      data: {
        course: {
          connect: objCourseIds,
        },
      },
    });
  }
}
