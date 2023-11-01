/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  getList() {
    // throw new HttpException('抛出异常测试', 401);
    return [];
  }
}
