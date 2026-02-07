import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserAvator = () => {
  //  添加请求代码获取用户头像
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
