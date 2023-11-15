/*
 * @Date: 2023-10
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/auth.decorator';

@ApiTags('公共接口')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  // Public 绕开jwt校验
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    // req.user 在 passport-local 身份验证流期间由 Passport 填充
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
