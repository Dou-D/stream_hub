import { headerMenuList } from "@/components/HeaderMenu/config";
import { AuthModal } from "@/features/auth/components/AuthModal";

export const HeaderMenu: React.FC = () => {
  return (
    <div className="hidden lg:flex items-center gap-8 justify-end">
      {headerMenuList.map((item) => (
        <div key={item.path} className="flex flex-col items-center gap-1 cursor-pointer">
          {item.icon}
          <span className="text-xs font-medium">{item.title}</span>
        </div>
      ))}
      <AuthModal />
    </div>
  );
};
