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
import { MenuItemModule } from './menu-item/menu-item.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RedisCacheModule } from './common/db/redis-cache.module';
import { CourseModule } from './course/course.module';
import { PrismaModule } from './prisma/prisma.module';
import { CustomHttpModule } from './common/http.module';

@Module({
  imports: [
    PostsModule,
    MenuItemModule,
    AuthModule,
    UsersModule,
    RedisCacheModule,
    CourseModule,
    PrismaModule,
    CustomHttpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 注册jwt全局守卫
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
