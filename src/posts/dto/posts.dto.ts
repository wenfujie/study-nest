/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { XPageDTO } from '../../common/common.dto';

export class CreatePostDto {
  @ApiProperty({ description: '标题' })
  @IsNotEmpty({ message: '文章标题不能为空' })
  readonly title: string;

  @ApiProperty({ description: '作者' })
  @IsNotEmpty({ message: '作者不能为空' })
  readonly author: string;

  @ApiPropertyOptional({ description: '内容' })
  readonly content: string;
}

export class FindAllDto extends XPageDTO {
  @ApiPropertyOptional({ description: '标题' })
  readonly title?: string;
}
