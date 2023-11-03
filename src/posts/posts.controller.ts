/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  CreatePostDto,
  DeleteBatchDto,
  FindAllDto,
  FindOneDto,
  UpdatePostDto,
} from './dto/posts.dto';
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

  @ApiOperation({ summary: '修改文章' })
  @Post('Update')
  update(@Body() params: UpdatePostDto) {
    return this.postsService.update(params);
  }

  @ApiOperation({ summary: '批量删除文章' })
  @Post('DeleteBatch')
  deleteBatch(@Body() params: DeleteBatchDto) {
    return this.postsService.deleteBatch(params.ids);
  }
}
