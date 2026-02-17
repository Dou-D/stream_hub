import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Ellipsis, Share, UserRoundPlus } from "lucide-react";
const friends = [
  { name: "Alice", id: "alice_01" },
  { name: "Bob", id: "bob_23" },
  { name: "Charlie", id: "charlie_77" },
  { name: "Daisy", id: "daisy_88" },
];
export const UserProfile = () => {
  return (
    <div className="space-y-2">
      {/* name */}
      <h1 className="text-2xl font-bold">shadcn</h1>
      {/* button */}
      <div className="flex items-center gap-2">
        {/* follow */}
        <Button variant="default" size="lg">
          关注
        </Button>
        {/* private message */}
        <Button variant="outline" size="lg">
          私信
        </Button>
        {/* make friends */}
        <Button variant="outline" size="icon-sm" type="button">
          <span className="sr-only">添加好友</span>
          <UserRoundPlus />
        </Button>
        {/* share */}
        <HoverCard openDelay={10} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Button variant="outline" size="icon-sm" type="button">
              <span className="sr-only">向朋友推荐</span>
              <Share />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="flex max-w-sm flex-col gap-0.5">
            <Input placeholder="搜索朋友" className="mb-2" />
            <div className="max-h-56 space-y-2 overflow-y-auto">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-muted/60"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{friend.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div className="leading-tight">
                      <p className="text-sm font-medium">{friend.name}</p>
                      <p className="text-xs text-muted-foreground">@{friend.id}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" type="button">
                    <span className="sr-only">聊天</span>
                    聊天
                  </Button>
                </div>
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>
        {/* 更多操作 */}
        <HoverCard openDelay={10} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Button variant="outline" size="icon-sm">
              <span className="sr-only">更多操作</span>
              <Ellipsis />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="flex flex-col gap-0.5 max-w-25">
            <Button variant="ghost" size="sm">
              举报账号
            </Button>
            <Button variant="ghost" size="sm">
              拉黑
            </Button>
          </HoverCardContent>
        </HoverCard>
      </div>
      {/* following followers liked */}
      <div className="flex items-center text-sm gap-4">
        <span>
          <strong>100</strong> 已关注
        </span>
        <span>
          <strong>50</strong> 粉丝
        </span>
        <span>
          <strong>200</strong> 赞
        </span>
      </div>
      {/* my id and ip */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <p>ID: 123456</p>
        <p>IP属地: 北京</p>
      </div>
      {/* signature */}
      <p className="text-sm text-muted-foreground">这是我的个人签名，喜欢我的话就赞我吧！</p>
    </div>
  );
};
