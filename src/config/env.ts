// 1. 定义接口，增强类型提示
interface Config {
  apiBaseUrl: string;
  appTitle: string;
  isDev: boolean;
}

// 2. 统一读取
export const config: Config = {
  // Vite 使用 import.meta.env，Next.js/Webpack 使用 process.env
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
  appTitle: import.meta.env.VITE_APP_TITLE as string,
  isDev: import.meta.env.DEV, // Vite 自带的布尔值
};

// 3. (可选) 做一层简单的校验，防止上线后才发现配置漏了
if (!config.apiBaseUrl) {
  console.error("致命错误：未配置 VITE_API_BASE_URL");
}
