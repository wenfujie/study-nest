/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Controller, Post } from '@nestjs/common';
import { User } from './user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('用户管理')
@Controller('users')
export class UsersController {
  @Post('GetUserInfo')
  //通过 @User 获取用户信息
  getUser(@User() user) {
    return user;
  }
}
