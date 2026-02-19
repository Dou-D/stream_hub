import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserAvatar = () => {
  return (
    <Avatar className="w-full h-full shrink-0">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
    </Avatar>
  );
};
