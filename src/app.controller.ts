/*
 * @Date: 2023-10
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('公共接口')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
