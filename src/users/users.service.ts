/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Injectable } from '@nestjs/common';

export interface User {
  userid: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private users: User[];

  constructor() {
    this.users = [
      {
        userid: 1,
        username: 'susu',
        password: 'susu123456',
      },
      {
        userid: 2,
        username: 'admin',
        password: 'admin',
      },
    ];
  }

  async findOne(username: string): Promise<null | User> {
    return this.users.find((item) => username === item.username);
  }
}
