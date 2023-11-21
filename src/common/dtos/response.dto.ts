/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */

import { ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

/** page信息接口 */
export interface IPageInfoSimple {
  page?: number;
  pageSize?: number;
}

@ApiTags('分页信息')
export class XPageDTO implements IPageInfoSimple {
  @ApiPropertyOptional({
    title: '当前页号',
    minimum: 1,
    default: 1,
    description: '最小页号是1',
  })
  @IsOptional()
  @IsInt({ message: '参数page要求是整数!' })
  @Min(1, { message: '参数page的值从1开始' })
  page?: number;

  @ApiPropertyOptional({
    title: '每页的记录数',
    minimum: 1,
    maximum: 1000,
    default: 100,
  })
  @IsOptional()
  @IsInt({ message: '参数page_size要求是整数!' })
  @Min(1, { message: '参数page_size最小值是1' })
  @Max(1000, { message: '参数page_size最大值是1000' })
  pageSize?: number;
}

/** 分页的结果接口 */
export interface PageResult<T = unknown> {
  items: T[];
  total: number;
}

export type PageResultPromise<T> = Promise<PageResult<T>>;
