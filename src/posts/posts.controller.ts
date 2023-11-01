/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('query')
  getList() {
    return this.postsService.getList();
  }

  @Post('add')
  create(@Body() dto: CreatePostDto) {
    const { title } = dto;
    return 'title是' + title;
  }
}
