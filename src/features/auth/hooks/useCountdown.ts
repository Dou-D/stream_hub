import { useState, useEffect, useRef, useCallback } from "react";
export const useCountdown = () => {
  const [count, setCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startCountdown = useCallback((seconds: number) => {
    // 防止重复点击导致定时器重叠
    if (timerRef.current) clearInterval(timerRef.current);

    setCount(seconds);

    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!); // 倒计时结束
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // 组件卸载时清除定时器，防止内存泄漏
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { count, startCountdown };
};
