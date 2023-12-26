/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-12
 * @Description:
 */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { redisStore } from 'cache-manager-redis-store';

@Global()
@Module({
  imports: [
    // nest10 使用新注册方式
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          store: (await redisStore({
            socket: {
              host: configService.get('REDIS_HOST'),
              port: configService.get('REDIS_PORT'),
            },
            database: configService.get('REDIS_DB'),
            ttl: 20,
            // 无密码则忽略
            // password: configService.get('REDIS_PASSWORD'),
          })) as unknown as CacheStore,
        };
      },
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
