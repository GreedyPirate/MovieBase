// services/httpClient.ts
import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// 创建 axios 实例的工厂函数
const createHttpClient = (config: AxiosRequestConfig): AxiosInstance => {
  const defaultConfig: AxiosRequestConfig = {
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // 合并默认配置和自定义配置（自定义优先）
  const mergedConfig = { ...defaultConfig, ...config };
  console.log(`[${mergedConfig.baseURL}] Creating HTTP client with config:`, mergedConfig);
  
  const instance = axios.create(mergedConfig);

  instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(' [Axios Request]');
    console.log('	URL:', config.url);
    console.log('	Method:', config.method?.toUpperCase());
    
    // 打印请求头（headers）
    console.log('	Headers:', {
      ...config.headers,
    });

    // 打印 URL 查询参数（query params）
    if (config.params) {
      console.log('	Query Params:', config.params);
    }

    // 打印请求体（body / data）
    if (config.data) {
      console.log('	Request Body:', config.data);
    }

    // console.log('──────────────────────────────────');

    return config;
  },
  (error) => {
    console.error('❌ [Axios Request Error]', error);
    return Promise.reject(error);
  }
);
  // 可选：为每个实例添加拦截器
  instance.interceptors.response.use(
    (response) => {
      // console.log('✅ 请求成功:', {
      //   url: response.config.url,
      //   status: response.status,
      //   dataLength: response.data?.results?.length || 0,
      //   totalPages: response.data?.total_pages,
      //   totalResults: response.data?.total_results,
      //   data: response.data?.results
      // });
      
      // 如果还想看完整数据（数据量大时谨慎使用）
      // console.log('📊 完整响应数据:', response.data);
      
      return response;
    },
    (error) => {
      console.error(`[${error.config?.url ?? ''}] Request failed:`, error.message);
      return Promise.reject(error);
    }
  );

  return instance;
};


export default createHttpClient;