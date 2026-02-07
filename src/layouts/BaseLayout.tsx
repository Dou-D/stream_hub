import { Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { HeaderMenu } from "@/components/HeaderMenu";

const BaseLayout = () => {
  return (
    // 侧边栏占一整列 header与main占一整列
    <div className="h-screen w-screen grid grid-cols-[240px_1fr] grid-rows-[64px_1fr]">
      <div className="hidden lg:block md:row-span-2 bg-gray-500 overflow-y-auto">
        <aside className="p-4">侧边栏</aside>
      </div>
      {/* 小于lg时，header占一整行 */}
      <header className="w-full grid grid-cols-3 items-center ">
        {/* search input */}
        <div className="col-span-2 justify-self-center">
          <Field className="w-xs">
            <ButtonGroup>
              <Input
                id="input-button-group"
                className="rounded-full w-full"
                placeholder="Type to search..."
              />
              <Button className="rounded-full" variant="outline">
                <Search />
              </Button>
            </ButtonGroup>
          </Field>
        </div>
        {/* header menu */}
        <div className="w-full justify-self-end">
          <HeaderMenu />
        </div>
      </header>

      <div className="bg-gray-300 max-lg:col-span-2 row-span-2">
        <main className="min-h-full">
          {/* <Outlet /> */}
          content
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;
