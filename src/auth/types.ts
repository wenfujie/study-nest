/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { User } from '@prisma/client';

export type JwtJson = Omit<User, 'password'>;
