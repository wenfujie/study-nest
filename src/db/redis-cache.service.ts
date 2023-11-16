/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: CacheStore,
  ) {}

  set(key: string, value: string, ttl: number) {
    return this.cacheManager.set(key, value, { ttl });
  }

  get(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  del(key: string) {
    return this.cacheManager.del(key);
  }
}
