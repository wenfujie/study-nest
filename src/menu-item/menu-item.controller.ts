/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('menuItem')
export class MenuItemController {
  constructor(private prisma: PrismaService) {}

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
}
