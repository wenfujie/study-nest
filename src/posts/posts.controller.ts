/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/posts.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('文章管理')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: '获取文章列表' })
  @Get('query')
  getList() {
    return this.postsService.getList();
  }

  @ApiOperation({ summary: '新增文章' })
  @Post('add')
  create(@Body() dto: CreatePostDto) {
    const { title } = dto;
    return 'title是' + title;
  }
}
