import { ArrowDownToLine, Gem, Mail, Megaphone, Upload, Wallpaper } from "lucide-react";

export type HeaderMenuTypes = {
  icon: React.ReactNode;
  title: string;
  path: string;
};

export const headerMenuList: HeaderMenuTypes[] = [
  {
    icon: <Gem />,
    title: "充钻石",
    path: "/diamond",
  },
  {
    icon: <ArrowDownToLine />,
    title: "客户端",
    path: "/client",
  },
  {
    icon: <Wallpaper />,
    title: "壁纸",
    path: "/wallpaper",
  },
  {
    icon: <Megaphone />,
    title: "通知",
    path: "/notification",
  },
  {
    icon: <Mail />,
    title: "消息",
    path: "/message",
  },
  {
    icon: <Upload />,
    title: "投稿",
    path: "/upload",
  },
];
