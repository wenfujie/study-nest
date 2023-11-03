/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, FindAllDto } from './dto/posts.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('文章管理')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: '获取文章列表' })
  @Post('query')
  getList(@Body() params: FindAllDto) {
    return this.postsService.findAll(params);
  }

  @ApiOperation({ summary: '新增文章' })
  @Post('add')
  create(@Body() params: CreatePostDto) {
    return this.postsService.create(params);
  }
}
