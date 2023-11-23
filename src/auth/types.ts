/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { User } from '@prisma/client';

// jwt 解码后结构
export type JwtJson = Omit<User, 'password'>;
