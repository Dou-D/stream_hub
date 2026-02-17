import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Kanban, Star } from "lucide-react";
import { Link } from "react-router";

type UserSectionTabsProps = {
  currentTab: string;
};

export const UserSectionTabs = ({ currentTab }: UserSectionTabsProps) => {
  return (
    <Tabs value={currentTab}>
      <TabsList variant="line" aria-label="个人主页内容分类">
        <TabsTrigger value="videos" asChild>
          <Link to="videos" className="text-xl">
            <Kanban aria-hidden="true" focusable="false" />
            作品
          </Link>
        </TabsTrigger>
        <TabsTrigger value="liked" asChild>
          <Link to="liked" className="text-xl">
            <Heart aria-hidden="true" focusable="false" />
            喜欢
          </Link>
        </TabsTrigger>
        <TabsTrigger value="collected" asChild>
          <Link to="collected" className="text-xl">
            <Star aria-hidden="true" focusable="false" />
            收藏
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
