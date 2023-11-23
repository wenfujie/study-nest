/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddUserDto {
  @ApiProperty({ description: '用户名称' })
  @IsNotEmpty({ message: '用户名称不能为空' })
  username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
