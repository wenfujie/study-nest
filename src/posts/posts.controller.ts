/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  CreatePostDto,
  DeleteBatchDto,
  FindOneDto,
  UpdatePostDto,
} from './posts.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { XPageDTO } from '../common/common.dto';

@ApiTags('文章管理')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: '获取文章列表' })
  @Post('Query')
  findAll(@Body() body: XPageDTO) {
    const { page = 1, pageSize = 10 } = body;

    return this.postsService.findAll({
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  }

  @ApiOperation({ summary: '获取文章详情' })
  @Post('QueryDetail')
  async findOne(@Body() data: FindOneDto) {
    const record = await this.postsService.findOne(data.id);
    if (!record) throw new HttpException('文章不存在', 401);
    return record;
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

  @ApiOperation({ summary: '删除所有文章' })
  @Post('DeleteAll')
  deleteAll() {
    return this.postsService.deleteAll();
  }
}
