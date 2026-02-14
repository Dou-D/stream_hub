import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { useUIStore, useAuthStore } from "@/store";
import { config } from "@/config";

// 1. 创建 axios 实例 (推荐)
const service: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10 * 1000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

// 2. 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      // 这里的类型断言有助于通过 TS 检查，也可以用 config.headers.set('Authorization', ...)
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
  (response: AxiosResponse) => {
    let res = response.data;
    // 拦截后端返回的错误
    if (res.status !== 200) throw new Error(res.message);
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
        // 显示登录弹窗
        useUIStore.getState().setAuthModalState(true);
        useAuthStore.getState().logout();
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
// 注意：由于拦截器已经返回了 response.data，所以这里返回类型直接就是 T
const request = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return service.get(url, config);
  },

  post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return service.post(url, data, config);
  },

  put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return service.put(url, data, config);
  },

  delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return service.delete(url, config);
  },

  // 暴露原始 instance 用于特殊需求
  instance: service,
};

export default request;
