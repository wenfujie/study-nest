/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddUserDto } from './user.dto';
import { UsersService } from './users.service';

@ApiTags('用户管理')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('QueryUserInfo')
  //通过 @User 获取用户信息
  getUser() {
    return;
  }

  @Post('Add')
  AddUser(@Body() data: AddUserDto) {
    return this.usersService.addUser(data.username, data.password);
  }
}
