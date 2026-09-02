import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "User",
    path: "/users",
    icon: Users,
  },
  {
    label: "Posts",
    path: "/posts",
    icon: Package,
  },
  {
    label: "Albums",
    path: "/albums",
    icon: FileText,
  },
];

export default function SimpleSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-neutral-50">
      <aside
        className={`flex flex-col border-r border-neutral-200 bg-white transition-all duration-200 ${
          collapsed ? "w-16" : "w-64"
        }`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-200">
          {!collapsed && (
            <span className="text-sm font-semibold text-neutral-900">
              Sose Dashbaoard
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900">
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-2 py-4">
          {menuItems.map(({ label, icon: Icon, path }) => {
            return (
              <NavLink
                key={label}
                to={path}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  }`
                }>
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-neutral-200 px-2 py-3">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900">
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Keluar</span>}
          </button>
        </div>
      </aside>
    </div>
  );
}
