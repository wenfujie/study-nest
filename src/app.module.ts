/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { PrismaService } from './prisma.service';
import { MenuItemModule } from './menu-item/menu-item.module';

@Module({
  imports: [PostsModule, MenuItemModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
