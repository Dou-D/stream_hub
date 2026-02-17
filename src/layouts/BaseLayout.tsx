import { Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { HeaderMenu } from "@/components/HeaderMenu";

const BaseLayout = () => {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 bg-muted/30 lg:grid-cols-[240px_1fr]">
      <aside className="hidden border-r bg-background lg:block">
        <div className="h-full overflow-y-auto p-4">
          <p className="text-sm font-medium">侧边栏</p>
        </div>
      </aside>

      <div className="grid min-h-screen grid-rows-[64px_1fr] overflow-hidden">
        <header className="bg-background/95 supports-backdrop-filter:bg-background/80 sticky top-0 z-20 border-b backdrop-blur">
          <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-[1fr_auto] items-center px-4 sm:px-6 max-lg:grid-cols-1 max-lg:justify-items-center max-lg:content-center">
            <Field className="w-full max-w-xl">
              <ButtonGroup className="w-full">
                <Input
                  id="input-button-group"
                  className="w-full rounded-l-full"
                  placeholder="Type to search..."
                />
                <Button className="rounded-r-full px-4" variant="outline" aria-label="搜索">
                  <Search />
                </Button>
              </ButtonGroup>
            </Field>
            <div className="justify-self-end">
              <HeaderMenu />
            </div>
          </div>
        </header>

        <main className="h-full overflow-y-auto">
          <div className="mx-auto w-full p-4 sm:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;
