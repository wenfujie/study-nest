/*
 * @Date: 2023-10
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/core/interceptor/transform.interceptor';
import { HttpExceptionFilter } from './common/core/filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 错误过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 响应拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 校验请求管道
  app.useGlobalPipes(new ValidationPipe());

  app.enableShutdownHooks();

  initSwaggerModule(app);

  await app.listen(3000);
}
bootstrap();

// 设置swagger文档
function initSwaggerModule(app) {
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
