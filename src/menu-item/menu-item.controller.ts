/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddTypeDto, FindCourseListDto } from './menu-item.dto';
import { MenuItemService } from './menu-item.service';

@ApiTags('课程分类管理')
@Controller('menuItem')
export class MenuItemController {
  constructor(
    private prisma: PrismaService,
    private menuItemService: MenuItemService,
  ) {}

  @ApiOperation({ summary: '创建分类' })
  @Post('Add')
  create(@Body() params: { label: string; parentId?: number }) {
    const { label, parentId } = params;
    return this.prisma.menuItem.create({ data: { label, parentId } });
  }

  @ApiOperation({ summary: '查询分类列表' })
  @Post('Query')
  findMany() {
    return this.prisma.menuItem.findMany({
      where: {
        parentId: null,
      },
      include: { children: { include: { children: {} } } },
    });
  }

  @ApiOperation({ summary: '修改分类' })
  @Post('Update')
  update(@Body() params: { label: string; id: number }) {
    const { label, id } = params;
    return this.prisma.menuItem.update({
      where: { id },
      data: { label },
    });
  }

  @ApiOperation({ summary: '删除分类' })
  @Post('Delete')
  delete(@Body() params: { id: number }) {
    const { id } = params;
    return this.prisma.menuItem.delete({ where: { id } });
  }

  @ApiOperation({ summary: '为课程添加分类' })
  @Post('AddType')
  addType(@Body() data: AddTypeDto) {
    return this.menuItemService.addCourses(data);
  }

  @ApiOperation({ summary: '根据分类id，获取课程列表' })
  @Post('QueryCourses')
  GetCoursesById(@Body() data: FindCourseListDto) {
    return this.menuItemService.getCourseList(data.menuId);
  }
}
