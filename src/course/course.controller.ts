/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Body, Controller, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AddCourseDto,
  AuthCoursesDto,
  DeleteBatchDto,
  QueryDetailDto,
  UpdateDto,
} from './course.dto';
import { XPageDTO } from '../common/dtos';
import { User } from '../users/user.decorator';

@ApiTags('课程管理')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOperation({ summary: '获取课程列表' })
  @Post('Query')
  findAll(@User() user, @Body() body: XPageDTO) {
    const { page = 1, pageSize = 10 } = body;

    return this.courseService.findAll({
      userId: user.id,
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  }

  @ApiOperation({ summary: '获取课程详情' })
  @Post('QueryDetail')
  findOne(@Body() data: QueryDetailDto) {
    return this.courseService.findOne(data.id);
  }

  @ApiOperation({ summary: '新增课程' })
  @Post('Add')
  create(@Body() data: AddCourseDto) {
    return this.courseService.create(data);
  }

  @ApiOperation({ summary: '批量删除课程' })
  @Post('DeleteBatch')
  deleteBatch(@Body() data: DeleteBatchDto) {
    return this.courseService.deleteBatch(data.ids);
  }

  @ApiOperation({ summary: '编辑课程' })
  @Post('Update')
  update(@Body() data: UpdateDto) {
    return this.courseService.update(data);
  }

  @ApiOperation({ summary: '为用户分配课程访问权限' })
  @Post('AuthCourses')
  authCourses(@Body() data: AuthCoursesDto) {
    return this.courseService.authCourses(data);
  }
}
