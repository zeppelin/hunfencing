/// <reference path="../../types/global.d.ts" />
import { createHandyClient } from 'handy-redis';

interface ScraperResultCacheObject {
  value: string;
  lastUpdated: Option<string>;
}

const client = createHandyClient(process.env.REDIS_URL || 'redis://localhost:6379');

export default class Cache {
  static async get(key: string): Promise<Option<ScraperResultCacheObject>> {
    let type = await client.type(key);

    if (type === 'string') {
      let value = await client.get(key);

      return {
        value,
        lastUpdated: null
      };
    } else if (type === 'hash') {
      let [value, lastUpdated] = await client.hmget(key, 'value', 'lastUpdated');
      return { value, lastUpdated };
    }

    return null;
  }

  static async set(key: string, value: string) {
    let type = await client.type(key);

    if (type === 'string') {
      await client.del(key);
    }

    return await client.hmset(key, ['value', value], ['lastUpdated', new Date().toISOString()]);
  }
}

export const needsUpdate = (lastUpdated: string, ttl: number): boolean => {
  if (!lastUpdated) {
    return true;
  }

  let currentDateValue = new Date().valueOf();
  let lastUpdatedValue = new Date(lastUpdated).valueOf();

  return (currentDateValue - lastUpdatedValue) > ttl;
};
