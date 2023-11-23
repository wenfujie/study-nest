/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtJson } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<null | JwtJson> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: { name: string; id: string }) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
