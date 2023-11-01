/*
 * @Date: 2023-10
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
