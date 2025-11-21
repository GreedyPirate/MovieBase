// services/apiClients.ts
import createHttpClient from './httpClient';

// 后端 API
export const appApi = createHttpClient({
  baseURL: 'https://api.your-backend.com',
  headers: {
  },
});

export const tmdbApi = createHttpClient({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 30000, // 第三方可能慢一点
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN}`
  },
});

export const imageBedApi = createHttpClient({
  baseURL: 'https://wmimg.com/api/v1',
  timeout: 30000,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_PICTURE_BED_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

