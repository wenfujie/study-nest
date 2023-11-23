/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtJson } from '../auth/types';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtJson => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
