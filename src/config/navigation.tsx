import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faHouse,
  faGauge,
  faClipboard,
  faThumbsUp,
  faTree,
  faWrench,
  faFile,
  faTasks,
  faCog,
  faUsers,
  faTags,
  faPlug,
  faCogs,
  faSitemap,
  faBoxArchive,
  faTable,
  faCloud,
  faCamera,
  faComputer,
} from "@fortawesome/free-solid-svg-icons";
import { IntegrationsPage } from "../pages/settings/organization/Integrations/Integrations";

export interface NavItem {
  name: string;
  icon: IconProp;
  path: string;
  section?: string;
  element?: React.ReactNode;
  disabled?: boolean;
}

export interface MainNavSection {
  name: string;
  icon: IconProp;
  path: string;
  // Secondary sidebar items (optional)
  subItems?: NavItem[];
  // Component to render for standalone pages
  component?: React.ComponentType;
}

export const mainNavigation: MainNavSection[] = [
  {
    name: "Insights",
    icon: faGauge,
    path: "/insights",
  },
  {
    name: "Collect",
    icon: faClipboard,
    path: "/collect",
  },
  {
    name: "Reviews",
    icon: faThumbsUp,
    path: "/reviews",
  },
  {
    name: "Carbon",
    icon: faTree,
    path: "/carbon",
  },
  {
    name: "Utilities",
    icon: faWrench,
    path: "/utilities",
  },
  {
    name: "Reports",
    icon: faFile,
    path: "/reports",
  },
  {
    name: "Actions",
    icon: faTasks,
    path: "/actions",
  },
];

export const settingsNavigation: MainNavSection = {
  name: "Settings",
  icon: faCog,
  path: "/settings",
  subItems: [
    {
      name: "Manage",
      icon: faHouse,
      path: "/settings/org/manage",
      section: "Organisation",
    },
    {
      name: "Users",
      icon: faUsers,
      path: "/settings/org/users",
      section: "Organisation",
    },
    {
      name: "Tags",
      icon: faTags,
      path: "/settings/org/tags",
      section: "Organisation",
    },
    {
      name: "Integrations",
      icon: faPlug,
      path: "/settings/org/integrations",
      section: "Organisation",
      element: <IntegrationsPage />,
    },
    {
      name: "Configuration",
      icon: faCogs,
      path: "/settings/util/configuration",
      section: "Utilities",
    },
    {
      name: "Hierarchy",
      icon: faSitemap,
      path: "/settings/util/hierarchy",
      section: "Utilities",
    },
    {
      name: "Assets",
      icon: faBoxArchive,
      path: "/settings/util/assets",
      section: "Utilities",
    },
    {
      name: "Configuration",
      icon: faCogs,
      path: "/settings/carb/configuration",
      section: "Carbon",
    },
    {
      name: "Hierarchy",
      icon: faSitemap,
      path: "/settings/carb/hierarchy",
      section: "Carbon",
    },
    {
      name: "Iventory Items",
      icon: faTable,
      path: "/settings/carb/iventory",
      section: "Carbon",
    },
    {
      name: "Emission Factors",
      icon: faCloud,
      path: "/settings/carb/emission",
      section: "Carbon",
    },
    {
      name: "Snapshots",
      icon: faCamera,
      path: "/settings/carb/snapshots",
      section: "Carbon",
      disabled: true,
    },
    {
      name: "Manage",
      icon: faComputer,
      path: "/settings/disp/manage",
      section: "Display",
    },
  ],
};

export const getAllSections = (): MainNavSection[] => {
  return [...mainNavigation, settingsNavigation];
};

export const getSubItemsForPath = (pathname: string): NavItem[] => {
  const allSections = getAllSections();
  const section = allSections.find((s) => pathname.startsWith(s.path));
  return section?.subItems || [];
};

export const getSectionTitle = (pathname: string): string => {
  const allSections = getAllSections();
  const section = allSections.find((s) => pathname.startsWith(s.path));
  return section?.name || "Insights";
};

export const hasSecondarySidebar = (pathname: string): boolean => {
  const subItems = getSubItemsForPath(pathname);
  return subItems.length > 0;
};
