/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ArrayMinSize, IsNotEmpty } from 'class-validator';

export class AddCourseDto {
  @ApiProperty({ description: '课程名称' })
  @IsNotEmpty({ message: '课程名称不能为空' })
  title: string;

  @ApiProperty({ description: '介绍图' })
  @IsNotEmpty({ message: '介绍图不能为空' })
  coverImage: string;
}

export class DeleteBatchDto {
  @ApiProperty({ description: '课程id集合' })
  @ArrayMinSize(1, { message: 'ids 不能为空' })
  ids: number[];
}

export class QueryDetailDto {
  @ApiProperty({ description: '课程id' })
  @IsNotEmpty({ message: '课程id不能为空' })
  id: number;
}

export class UpdateDto extends PartialType(AddCourseDto) {
  @ApiProperty({ description: '课程id' })
  @IsNotEmpty({ message: '课程id不能为空' })
  id: number;
}
