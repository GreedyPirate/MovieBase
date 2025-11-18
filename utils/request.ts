// utils/request.ts
import type { AxiosInstance } from 'axios';
import { appApi, tmdbApi } from './apiClients';

export const createRequestMethods = (client: AxiosInstance) => {
  return {
    get: async <T = any>(url: string, config?: any): Promise<T> => {
      const res = await client.get(url, config);
      return res.data;
    },
    post: async <T = any>(url: string, data?: any, config?: any): Promise<T> => {
      const res = await client.post(url, data, config);
      return res.data;
    },
  };
};

// 为每个 API 创建请求方法
export const appRequest = createRequestMethods(appApi);
export const tmdbRequest = createRequestMethods(tmdbApi);
