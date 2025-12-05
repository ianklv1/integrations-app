import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { MainSidebar } from "../MainSidebar";
import { Breadcrumb } from "../Breadcrumb";
import { hasSecondarySidebar } from "../../config/navigation";

export const Layout = () => {
  const location = useLocation();
  const [isSecondarySidebarOpen, setIsSecondarySidebarOpen] = useState(false);
  const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false);

  const hasSidebar = hasSecondarySidebar(location.pathname);

  const handleOpenMainSidebar = () => {
    setIsMainSidebarOpen(true);
    setIsSecondarySidebarOpen(false);
  };

  const handleOpenSecondarySidebar = () => {
    setIsSecondarySidebarOpen(true);
    setIsMainSidebarOpen(false);
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <MainSidebar
        isOpen={isMainSidebarOpen}
        onClose={() => setIsMainSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <Breadcrumb
          onMenuClick={handleOpenSecondarySidebar}
          onMainMenuClick={handleOpenMainSidebar}
          hasSecondarySidebar={hasSidebar}
        />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            isOpen={isSecondarySidebarOpen}
            onClose={() => setIsSecondarySidebarOpen(false)}
          />
          <main className="flex-1 overflow-auto bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
