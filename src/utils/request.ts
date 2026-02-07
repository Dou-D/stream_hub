import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

// 1. 创建 axios 实例 (推荐)
const service: AxiosInstance = axios.create({
  baseURL: "http://26.138.78.196",
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
  (error: any) => {
    return Promise.reject(error);
  },
);

// 3. 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // ✅ 这里只解包一次。
    // 如果你的后端约定 200 也有可能代表业务失败（比如 code !== 200），可以在这里处理
    return response.data;
  },
  (error: any) => {
    // 处理 HTTP 错误状态码 (401, 403, 500)
    let message = null;
    message = error.response?.data?.message;
    // 后端没返回字段我再添加,否则返回后端给我的message
    if (message === null) {
      switch (message) {
        case 401:
          message = "登录已过期，请重新登录";
          // 这里可以触发登出逻辑，例如清理 token 并跳转
          // localStorage.removeItem("token");
          // window.location.href = "/login";
          break;
        case 403:
          message = "没有权限访问，请联系管理员";
          break;
        case 500:
          message = "服务器内部错误，请稍后重试";
          break;
        default:
          message = error.response?.data?.message || "网络请求失败";
          break;
      }
    }
    if (error.response?.status === 401) {
      message = "登录已过期，请重新登录";
      // 这里可以触发登出逻辑，例如清理 token 并跳转
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }

    // 可以在这里集成你的 UI 组件库的 Message 提示
    // Message.error(message);

    // 依然把错误抛出去，让组件里的 TanStack Query 能够捕获到 isError
    return Promise.reject(new Error(message));
  },
);

// 4. 封装通用请求方法
// 注意：由于拦截器已经返回了 response.data，所以这里返回类型直接就是 T
const request = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return service.get(url, config);
  },

  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return service.post(url, data, config);
  },

  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return service.put(url, data, config);
  },

  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return service.delete(url, config);
  },

  // 甚至可以暴露原始 instance 用于特殊需求
  instance: service,
};

export default request;
