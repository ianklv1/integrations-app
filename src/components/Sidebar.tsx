import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getSubItemsForPath,
  getSectionTitle,
  type NavItem,
} from "../config/navigation";
import { theme } from "../config/theme";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const navItems = getSubItemsForPath(location.pathname);
  const sectionTitle = getSectionTitle(location.pathname);

  if (navItems.length === 0) {
    return null;
  }

  const renderNavItem = (item: NavItem) => {
    const isActive = location.pathname === item.path;

    return (
      <Link
        key={item.path}
        to={item.disabled ? "#" : item.path}
        onClick={item.disabled ? undefined : onClose}
        aria-disabled={item.disabled}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
          item.disabled
            ? "cursor-not-allowed opacity-50"
            : isActive
            ? `${theme.classes.bg} text-white`
            : "text-gray-700 hover:bg-gray-100"
        }`}
        onClickCapture={(e) => {
          if (item.disabled) {
            e.preventDefault();
            e.stopPropagation();
          } else {
            onClose();
          }
        }}
      >
        <div
          className={`w-5 h-5 flex items-center justify-center ${
            isActive ? "text-white" : `${theme.classes.text}`
          }`}
        >
          <FontAwesomeIcon icon={item.icon} />
        </div>
        <span className="text-sm font-medium">{item.name}</span>
      </Link>
    );
  };

  // Group items by section dynamically
  const sections = navItems.reduce((acc, item) => {
    const section = item.section || "Other";
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

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
          fixed lg:sticky top-0 right-0 lg:left-auto h-full lg:h-screen z-40
          w-64 bg-white lg:bg-transparent border-l lg:border-l-0 flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
          flex
        `}
      >
        <div className="lg:hidden px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border border-gray-400 rounded flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                {sectionTitle.charAt(0)}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-800">
              {sectionTitle}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="text-gray-600">✕</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          {Object.entries(sections).map(([sectionName, items]) => (
            <div key={sectionName} className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
                {sectionName}
              </h3>
              <nav className="space-y-1">{items.map(renderNavItem)}</nav>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};
