/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Module } from '@nestjs/common';
import { MenuItemController } from './menu-item.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [MenuItemController],
  providers: [PrismaService],
})
export class MenuItemModule {}
