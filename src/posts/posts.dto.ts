/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */

import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { ArrayMinSize, IsNotEmpty, IsString } from 'class-validator';
import { XPageDTO } from '../common/common.dto';

export class CreatePostDto {
  @ApiProperty({ description: '标题' })
  @IsNotEmpty({ message: '文章标题不能为空' })
  readonly title: string;

  @ApiPropertyOptional({ description: '内容' })
  readonly content: string;

  @ApiProperty({ description: '课程id' })
  @IsNotEmpty({ message: '课程id不能为空' })
  readonly courseId: number;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({ description: '文章id' })
  @IsNotEmpty({ message: '文章id不能为空' })
  @IsString({ message: '参数类型错误' })
  readonly id: number;
}

export class FindOneDto {
  @ApiProperty({ description: '文章id' })
  @IsNotEmpty({ message: '文章id不能为空' })
  @IsString({ message: '参数类型错误' })
  readonly id: number;
}

export class DeleteBatchDto {
  @ApiProperty({ description: '文章id集合' })
  @ArrayMinSize(1, { message: 'ids 不能为空' })
  ids: number[];
}
