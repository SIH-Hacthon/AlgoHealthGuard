import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Droplets,
  Brain,
  AlertTriangle,
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface VerticalNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: number;
}

const VerticalNavbar: React.FC<VerticalNavbarProps> = ({
  activeTab,
  setActiveTab,
  notifications,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "reports", label: "Case Reports", icon: FileText },
    { id: "water", label: "Water Quality", icon: Droplets },
    { id: "predictions", label: "Predictions", icon: Brain },
    { id: "alerts", label: "Alerts", icon: AlertTriangle },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col shadow-sm
        ${isCollapsed ? "w-16" : "w-64"} sticky top-0 h-screen`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-3 border-b border-gray-200">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition"
        >
          {isCollapsed ? (
            <ChevronRight className="w-6 h-6" />
          ) : (
            <ChevronLeft className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <div className="space-y-3">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative w-full flex items-center px-3 py-3 rounded-lg transition-all
                  ${
                    activeTab === item.id
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                title={isCollapsed ? item.label : ""}
              >
                <IconComponent className="w-6 h-6 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="ml-3 truncate text-lg font-semibold">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}

          {/* Notifications */}
          <button
            onClick={() => setActiveTab("notifications")}
            className={`relative w-full flex items-center px-3 py-3 rounded-lg transition-all
              ${
                activeTab === "notifications"
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            title={isCollapsed ? "Notifications" : ""}
          >
            <Bell className="w-6 h-6 flex-shrink-0" />
            {!isCollapsed && (
              <span className="ml-3 text-lg font-semibold">Notifications</span>
            )}
            {notifications > 0 && (
              <span
                className={`absolute flex items-center justify-center rounded-full bg-red-500 text-white text-xs
                ${isCollapsed ? "top-1 right-1 w-4 h-4" : "top-2 right-3 w-5 h-5"}`}
              >
                {notifications > 9 ? "9+" : notifications}
              </span>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default VerticalNavbar;
