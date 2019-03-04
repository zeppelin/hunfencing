/// <reference path="../../types/global.d.ts" />
import * as redis from 'redis';

const redisClient = redis.createClient(process.env.REDIS_URL || 'redis://localhost:6379');

export default class Cache {
  static get(key: string): Promise<Maybe<string>> {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, reply) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(reply);
      });
    });
  }

  static set(key: string, value: string): Promise<'OK'> {
    return new Promise((resolve, reject) => {
      redisClient.set(key, value, (err, reply) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(reply);
      });
    });
  }
}
