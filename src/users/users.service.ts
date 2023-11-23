/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async addUser(username: string, password: string) {
    await this.prisma.user.create({
      data: {
        name: username,
        password: password,
      },
    });
  }

  async findOne(username: string): Promise<null | User> {
    return this.prisma.user.findFirst({
      where: { name: username },
    });
  }
}
