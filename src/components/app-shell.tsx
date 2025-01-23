import { Outlet } from "react-router-dom";
import useIsCollapsed from "@/hooks/use-is-collapsed";
import { Layout } from "./custom/layout";
import Sidebar from "./sidebar";
import SkipToMain from "./skip-to-main";
import { UserNav } from "./user-nav";
import ThemeSwitch from "./theme-switch";

export const AppShell = () => {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();

  return (
    <div className="relative h-full overflow-hidden bg-background">
      <SkipToMain />
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
          isCollapsed ? "md:ml-14" : "md:ml-64"
        } h-full`}
      >
        <Layout>
          <Layout.Header sticky>
            <div className="ml-auto flex items-center space-x-4">
              <ThemeSwitch />
              <UserNav
                profile={{
                  lastName: "Miradoniaina",
                  firstName: "Eddy",
                }}
              />
            </div>
          </Layout.Header>

          <Layout.Body>
            <Outlet />
          </Layout.Body>
        </Layout>
      </main>
    </div>
  );
};
