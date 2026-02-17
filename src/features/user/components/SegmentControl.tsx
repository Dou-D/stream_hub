import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const SegmentControl = () => {
  return (
    <Tabs defaultValue="latest">
      <TabsList>
        <TabsTrigger value="latest">最新</TabsTrigger>
        <TabsTrigger value="popular">热门</TabsTrigger>
        <TabsTrigger value="oldest">最旧</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
