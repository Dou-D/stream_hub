import { SegmentControl } from "@/features/user/components/SegMentControl";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { UserProfile } from "@/features/user/components/UserProfile";
import { UserSectionTabs } from "@/features/user/components/UserSectionTabs";
import { Outlet, useParams } from "react-router";

export const UserProfilePage = () => {
  const { tag = "videos" } = useParams();

  const currentTab = ["videos", "liked", "collected"].includes(tag) ? tag : "videos";

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border bg-background p-4 sm:p-6">
        {/* 顶部个人信息区域，包含头像、昵称、粉丝数、个签等 */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* 左侧 头像 昵称，粉丝，个签等个人数据*/}
          <div className="flex items-start gap-3 sm:items-center">
            {/* 头像 shrink-0禁止子项收缩 锁定头像尺寸 */}
            <div className="hidden w-28 shrink-0 rounded-full sm:block">
              <UserAvatar />
            </div>
            {/* username+followers+following */}
            <UserProfile />
          </div>
        </div>
      </div>
      <div className="flex justify-between max-sm:justify-center">
        {/* 作品/收藏/历史... */}
        <UserSectionTabs currentTab={currentTab} />
        {/* 视频顺序 */}
        <div className="hidden shrink-0 sm:block">
          <SegmentControl />
        </div>
      </div>
      {/* TODO: 根据tabs，在下面的Outlet中显示 */}
      <Outlet />
    </div>
  );
};
