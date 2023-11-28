/*
 * @Date: 2023-10
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/auth.decorator';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@ApiTags('公共接口')
@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
  ) {}

  // Public 绕开jwt校验
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    // req.user 在 passport-local 身份验证流期间由 Passport 填充
    return this.authService.login(req.user);
  }

  // httpService 示例
  @Public()
  @Post('ThirdService')
  async third() {
    return this.httpService
      .get('https://mock.uutool.cn/4n2u04dc8m30')
      .pipe(map((res) => res.data));
  }
}
