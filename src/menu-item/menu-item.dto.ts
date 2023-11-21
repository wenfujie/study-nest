/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */

import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class FindCourseListDto {
  @ApiProperty({ description: '分类id' })
  @IsNotEmpty({ message: '分类id不能为空' })
  menuId: number;
}

export class AddTypeDto {
  @ApiProperty({ description: '分类id' })
  @IsNotEmpty({ message: '分类id不能为空' })
  menuId: number;

  @ApiProperty({ description: '课程id' })
  @ArrayNotEmpty({ message: '课程id不能为空' })
  courseIds: number[];
}
