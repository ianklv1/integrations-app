import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGridHorizontal,
  faArrowUp,
  faArrowDown,
  faSearch,
  faBell,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { theme } from "../config/theme";
import { getAllSections, getSubItemsForPath } from "../config/navigation";

interface Organization {
  id: string;
  name: string;
  initials: string;
}

const organizations: Organization[] = [
  { id: "1", name: "ABC Group Ltd", initials: "AB" },
  { id: "2", name: "Swathy Corp 2", initials: "SC" },
  { id: "3", name: "Adhesif Labels Ltd", initials: "AL" },
  { id: "4", name: "AIA Services New Zealand Limited", initials: "AS" },
  { id: "5", name: "Air New Zealand Ltd", initials: "AN" },
  { id: "6", name: "All Blacks Organization", initials: "AB" },
  { id: "7", name: "All Hands Demo Limited", initials: "AH" },
];

interface BreadcrumbProps {
  onMenuClick: () => void;
  onMainMenuClick: () => void;
  hasSecondarySidebar?: boolean;
}

const getPageInfo = (pathname: string) => {
  const allSections = getAllSections();
  const currentSection = allSections.find((s) => pathname.startsWith(s.path));

  if (!currentSection) {
    const firstSection = allSections[0];
    return {
      section: firstSection.name,
      page: firstSection.name,
      icon: firstSection.icon,
    };
  }

  const subItems = getSubItemsForPath(pathname);

  if (subItems.length > 0) {
    const currentSubItem = subItems.find((item) => item.path === pathname);
    if (currentSubItem) {
      return {
        section: currentSection.name,
        page: currentSubItem.name,
        icon: currentSubItem.icon,
      };
    }
  }

  return {
    section: currentSection.name,
    page: currentSection.name,
    icon: currentSection.icon,
  };
};

export const Breadcrumb = ({
  onMenuClick,
  onMainMenuClick,
  hasSecondarySidebar = false,
}: BreadcrumbProps) => {
  const location = useLocation();
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(organizations[0]);
  const [orgFilter, setOrgFilter] = useState("");
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const { page, icon } = getPageInfo(location.pathname);

  const filteredOrgs = organizations.filter((org) =>
    org.name.toLowerCase().includes(orgFilter.toLowerCase())
  );

  const handleOrgSelect = (org: Organization) => {
    setSelectedOrg(org);
    setShowOrgDropdown(false);
    setOrgFilter("");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target as Node) &&
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target as Node)
      ) {
        setShowOrgDropdown(false);
      }

      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };

    if (showOrgDropdown || showUserDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOrgDropdown, showUserDropdown]);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="hidden lg:flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2 w-[40%]">
          <button
            onClick={onMainMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Open main menu"
          >
            <FontAwesomeIcon
              icon={faGridHorizontal}
              className="text-gray-600 text-lg"
            />
          </button>

          {hasSecondarySidebar && (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Open navigation"
            >
              <span className="text-gray-600 text-lg">☰</span>
            </button>
          )}

          <div
            className="relative sm:ml-4 md:ml-0 w-[70%] 2xl:w-[27%]"
            ref={desktopDropdownRef}
          >
            <button
              onClick={() => setShowOrgDropdown(!showOrgDropdown)}
              className={`flex items-center gap-2 w-full justify-between px-2 sm:px-3 py-1.5 rounded-lg transition-colors border ${
                showOrgDropdown
                  ? `${theme.classes.bg} ${theme.classes.bgHover} text-white ${theme.classes.border}`
                  : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
              }`}
            >
              <span className="text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-none">
                {selectedOrg.name}
              </span>
              <div
                className={`w-4 h-4 border rounded-full flex items-center justify-center flex-shrink-0 ${
                  showOrgDropdown ? "border-white" : "border-gray-400"
                }`}
              >
                <FontAwesomeIcon
                  icon={showOrgDropdown ? faArrowUp : faArrowDown}
                  className={`text-[10px] ${
                    showOrgDropdown ? "text-white" : "text-gray-500"
                  }`}
                />
              </div>
            </button>

            {showOrgDropdown && (
              <div className="absolute left-0 mt-2 w-[calc(100vw-2rem)] sm:w-72 max-w-md bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[100]">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  Help & Guides
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  Terms of Use
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  Privacy Policy
                </button>

                <div className="px-4 py-2 border-t border-gray-200 mt-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type to filter..."
                      value={orgFilter}
                      onChange={(e) => setOrgFilter(e.target.value)}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${theme.classes.focusRing}`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <FontAwesomeIcon icon={faSearch} className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                <div className="max-h-48 overflow-y-auto">
                  {filteredOrgs.map((org) => (
                    <button
                      key={org.id}
                      onClick={() => handleOrgSelect(org)}
                      className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-gray-100 transition-colors ${
                        selectedOrg.id === org.id ? "bg-gray-50" : ""
                      }`}
                    >
                      <div className="w-7 h-7 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-medium">
                          {org.initials}
                        </span>
                      </div>
                      <span className="text-gray-700 truncate">{org.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 w-[30%]">
            <div className="w-8 h-8 flex items-center justify-center">
              <FontAwesomeIcon icon={icon} className="text-sm text-gray-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800">
                {page}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="w-9 h-9 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors">
            <FontAwesomeIcon
              icon={faSearch}
              className="w-4 h-4 text-gray-600"
            />
          </button>
          <button className="relative w-9 h-9 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors">
            <FontAwesomeIcon icon={faBell} className="w-4 h-4 text-gray-600" />
            <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-[10px] font-bold text-white leading-none">
                3
              </span>
            </span>
          </button>
          <button className="w-9 h-9 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors">
            <FontAwesomeIcon
              icon={faCircleQuestion}
              className="w-4 h-4 text-gray-600"
            />
          </button>

          <div className="relative" ref={userDropdownRef}>
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="w-9 h-9 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <span className="text-white font-semibold text-sm">JA</span>
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[100]">
                <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors font-medium">
                  Account Settings
                </button>
                <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors font-medium">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onMainMenuClick();
                setShowOrgDropdown(false);
                setShowUserDropdown(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Open main menu"
            >
              <FontAwesomeIcon
                icon={faGridHorizontal}
                className="text-gray-600 text-lg"
              />
            </button>
          </div>

          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <span className="text-white font-semibold text-sm">JA</span>
          </button>
        </div>

        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            {hasSecondarySidebar && (
              <button
                onClick={() => {
                  onMenuClick();
                  setShowOrgDropdown(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Open navigation"
              >
                <span className="text-gray-600 text-lg">☰</span>
              </button>
            )}

            <div className="w-7 h-7 border-2 border-gray-400 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={icon} className="text-xs text-gray-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800">
                {page}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative" ref={mobileDropdownRef}>
              <button
                onClick={() => setShowOrgDropdown(!showOrgDropdown)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-colors border ${
                  showOrgDropdown
                    ? `${theme.classes.bg} ${theme.classes.bgHover} text-white ${theme.classes.border}`
                    : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
                }`}
              >
                <span className="text-xs font-medium truncate max-w-[100px]">
                  {selectedOrg.name}
                </span>
                <div
                  className={`w-3 h-3 border rounded-full flex items-center justify-center flex-shrink-0 ${
                    showOrgDropdown ? "border-white" : "border-gray-400"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={showOrgDropdown ? faArrowUp : faArrowDown}
                    className={`text-[10px] ${
                      showOrgDropdown ? "text-white" : "text-gray-500"
                    }`}
                  />
                </div>
              </button>

              {showOrgDropdown && (
                <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-md bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[100]">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    Help & Guides
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    Terms of Use
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    Privacy Policy
                  </button>

                  <div className="px-4 py-2 border-t border-gray-200 mt-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Type to filter..."
                        value={orgFilter}
                        onChange={(e) => setOrgFilter(e.target.value)}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${theme.classes.focusRing}`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FontAwesomeIcon icon={faSearch} className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  <div className="max-h-48 overflow-y-auto">
                    {filteredOrgs.map((org) => (
                      <button
                        key={org.id}
                        onClick={() => handleOrgSelect(org)}
                        className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-gray-100 transition-colors ${
                          selectedOrg.id === org.id ? "bg-gray-50" : ""
                        }`}
                      >
                        <div className="w-7 h-7 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-medium">
                            {org.initials}
                          </span>
                        </div>
                        <span className="text-gray-700 truncate">
                          {org.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
