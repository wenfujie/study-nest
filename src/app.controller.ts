/*
 * @Date: 2023-10
 * @LastEditors: wfj
 * @LastEditTime: 2023-10
 * @Description:
 */
import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('666')
  getHi(@Req() req: Request): string {
    // console.log(req);
    return 'hi';
  }
}
