import { useParams } from "react-router";

export const UserTagPage = () => {
  const { tag = "videos" } = useParams();

  const tagConfig: Record<string, { title: string; description: string }> = {
    videos: { title: "作品", description: "这是用户作品页内容。" },
    liked: { title: "喜欢", description: "这是用户喜欢页内容。" },
    collected: { title: "收藏", description: "这是用户收藏页内容。" },
  };

  const content = tagConfig[tag] ?? {
    title: "未知标签",
    description: `未找到标签 "${tag}" 对应的内容。`,
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">{content.title}</h2>
      <p className="mt-4 text-muted-foreground">{content.description}</p>
    </div>
  );
};
