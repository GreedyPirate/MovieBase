// services/apiClients.ts
import createHttpClient from './httpClient';

// 👉 你自己的后端 API
export const appApi = createHttpClient({
  baseURL: 'https://api.your-backend.com',
  headers: {
  },
});

export const tmdbApi = createHttpClient({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 30000, // 第三方可能慢一点
  headers: {
    // 如果需要 token:
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN}`
  },
});

