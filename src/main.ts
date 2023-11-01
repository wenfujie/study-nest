/*
 * @Date: 2023-10
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 错误过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 响应拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 校验请求管道
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
