import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../../config/theme";
import { mainNavigation, settingsNavigation } from "../../config/navigation";
import LionLogo from "../../assets/lionlogo.png";

interface MainSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MainSidebar = ({ isOpen, onClose }: MainSidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-full lg:h-screen z-40
          w-20 bg-gray-900 flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex items-center justify-center py-6">
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src={LionLogo}
              alt="Lion logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <nav className="flex flex-col items-center justify-center space-y-1">
          {mainNavigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`relative flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-colors ${
                isActive(item.path)
                  ? `${theme.classes.text}`
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {isActive(item.path) && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-white rounded-r-full" />
              )}
              <div className="w-8 h-8 flex items-center justify-center mb-1">
                <FontAwesomeIcon icon={item.icon} className="text-xl" />
              </div>
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="pb-6 flex flex-col items-center">
          <Link
            to={settingsNavigation.path}
            onClick={onClose}
            className={`relative flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-colors ${
              isActive(settingsNavigation.path)
                ? `${theme.classes.text}`
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {isActive(settingsNavigation.path) && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-white rounded-r-full" />
            )}
            <div className="w-8 h-8 flex items-center justify-center mb-1">
              <FontAwesomeIcon
                icon={settingsNavigation.icon}
                className="text-lg"
              />
            </div>
            <span className="text-[10px] font-medium">
              {settingsNavigation.name}
            </span>
          </Link>
        </div>
      </aside>
    </>
  );
};
