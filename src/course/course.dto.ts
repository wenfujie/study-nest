/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddCourseDto {
  @ApiProperty({ description: '课程名称' })
  @IsNotEmpty({ message: '课程名称不能为空' })
  title: string;

  @ApiProperty({ description: '介绍图' })
  @IsNotEmpty({ message: '介绍图不能为空' })
  coverImage: string;
}
