/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, FindAllDto, FindOneDto } from './dto/posts.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('文章管理')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: '获取文章列表' })
  @Post('Query')
  findAll(@Body() params: FindAllDto) {
    return this.postsService.findAll(params);
  }

  @ApiOperation({ summary: '获取文章详情' })
  @Post('QueryDetail')
  findOne(@Body() params: FindOneDto) {
    return this.postsService.findOne(params.id);
  }

  @ApiOperation({ summary: '新增文章' })
  @Post('Add')
  create(@Body() params: CreatePostDto) {
    return this.postsService.create(params);
  }
}
