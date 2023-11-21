/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Body, Controller, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddCourseDto } from './course.dto';

@ApiTags('课程管理')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOperation({ summary: '新增课程' })
  @Post('Add')
  create(@Body() data: AddCourseDto) {
    return this.courseService.create(data);
  }
}
