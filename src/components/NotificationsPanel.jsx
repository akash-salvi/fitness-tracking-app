import { Bell } from "lucide-react"; // Added some icons
import React from "react";
import { notifications } from "../utils/constants";

const NotificationsPanel = ({ data: { theme, isDarkMode, markAllAsRead, unreadCount } }) => (
  <div
    className={`absolute right-0 top-16 w-80 ${theme.cardBg} ${theme.shadow} rounded-lg overflow-hidden z-20 border ${theme.border} animate-fade-in-down`}
  >
    <div className={`p-3 border-b ${theme.border} flex justify-between items-center`}>
      <h3 className={`font-medium ${theme.text}`}>Notifications</h3>
      {unreadCount > 0 && (
        <button onClick={markAllAsRead} className={`text-sm ${theme.accent} hover:underline`}>
          Mark all as read
        </button>
      )}
    </div>
    <div className="max-h-80 overflow-y-auto">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 border-b ${theme.border} ${
              !notification.read ? (isDarkMode ? "bg-blue-900/30" : "bg-blue-50") : ""
            } ${theme.hover}`}
          >
            <div className="flex items-start">
              <div
                className={`p-1.5 rounded-full mr-2 mt-0.5 ${
                  !notification.read
                    ? isDarkMode
                      ? "bg-blue-600/30"
                      : "bg-blue-100"
                    : theme.iconBg
                }`}
              >
                <Bell size={16} className={!notification.read ? theme.accent : theme.subText} />
              </div>
              <div className="flex-1">
                <p className={`text-sm ${theme.text}`}>{notification.message}</p>
                <p className={`text-xs ${theme.subText} mt-1`}>{notification.time}</p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className={`p-4 text-sm text-center ${theme.subText}`}>No new notifications.</p>
      )}
    </div>
    <div className={`p-2 text-center border-t ${theme.border}`}>
      <button className={`text-sm ${theme.accent} hover:underline w-full py-1`}>
        View all notifications
      </button>
    </div>
  </div>
);

export default NotificationsPanel;
