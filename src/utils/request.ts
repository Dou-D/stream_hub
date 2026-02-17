import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import z from "zod";
import { useAuthStore } from "@/store";
import { config } from "@/config";
import { authResponseSchema } from "@/features/auth/schema";

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const TokenSchema = authResponseSchema.shape.data;
type TokenData = z.infer<typeof TokenSchema>;

const handleAuthExpired = () => {
  useAuthStore.getState().logout();
};

// 1. 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10 * 1000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
// 刷新 token 的 axios 实例，独立于主实例以避免请求拦截器的干扰
const refreshClient: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10 * 1000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
}

// 刷新 token 的 Promise，确保同时只有一个刷新请求在进行
let refreshPromise: Promise<TokenData> | null = null;

const getRefreshPromise = () => {
  if (!refreshPromise) {
    const refreshTokenValue = useAuthStore.getState().refresh_token;

    if (!refreshTokenValue) {
      handleAuthExpired();
      return Promise.reject(new Error("登录已过期，请重新登录"));
    }

    refreshPromise = refreshClient
      .post<ApiResponse<TokenData>>("/user/refresh", {
        refresh_token: refreshTokenValue,
      })
      .then((refreshResponse) => {
        const result = refreshResponse.data;

        if (result.status !== 200 || !result.data?.access_token || !result.data?.refresh_token) {
          throw new Error(result.message || "刷新令牌失败");
        }

        useAuthStore.getState().setTokens(result.data);
        return result.data;
      })
      .catch(() => {
        handleAuthExpired();
        return Promise.reject(new Error("登录已过期，请重新登录"));
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

// 2. 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().access_token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 3. 响应拦截器
service.interceptors.response.use(
  // @ts-expect-error response.data: ApiResponse 类型
  (response: AxiosResponse<ApiResponse>) => {
    const res = response.data;
    const originalRequest = response.config as RetryableRequestConfig;

    if (res.status === 403) {
      if (originalRequest._retry) {
        handleAuthExpired();
        return Promise.reject(new Error("登录已过期，请重新登录"));
      }

      originalRequest._retry = true;

      return getRefreshPromise()
        .then(() => service.request(originalRequest))
        .catch((error: Error) => Promise.reject(error));
    }

    if (res.status !== 200) throw new Error(res.message);
    // 请求成功，返回 ApiResponse 部分
    return res;
  },
  (error: AxiosError) => {
    let message = "";
    switch (error.response?.status) {
      case 400:
        message = "请求参数错误";
        break;
      case 401:
        message = "登录已过期，请重新登录";
        handleAuthExpired();
        break;
      case 403:
        message = "没有权限访问，请联系管理员";
        break;
      case 404:
        message = "资源不存在或接口地址错误";
        break;
      case 422:
        message = "请求参数校验失败";
        break;
      case 429:
        message = "请求过于频繁，请稍后再试";
        break;
      case 500:
        message = "服务器内部错误，请稍后重试";
        break;
      case 502:
      case 503:
      case 504:
        message = "服务暂时不可用，请稍后重试";
        break;
      default:
        message = `请求失败（${error.response?.status}）`;
        break;
    }
    return Promise.reject(new Error(message));
  },
);

// 4. 封装通用请求方法
const request = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    service.get(url, config),

  post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    service.post(url, data, config),

  put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    service.put(url, data, config),

  delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    service.delete(url, config),

  // 暴露原始 instance 用于特殊需求
  instance: service,
};

export default request;
