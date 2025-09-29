import React, { useState } from 'react';
import { Bell, X, AlertTriangle, Info, Clock } from 'lucide-react';
import { useRealTimeData } from '../hooks/useRealTimeData';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { alerts, markAlertAsRead } = useRealTimeData();
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');

  const notifications = [
    ...alerts.map(alert => ({
      id: alert.id,
      type: alert.type as 'critical' | 'warning' | 'info',
      title: alert.title,
      message: alert.description,
      time: alert.time,
      isRead: alert.isRead,
      location: alert.location
    })),
    {
      id: 'sys1',
      type: 'info' as const,
      title: 'System Update',
      message: 'HealthGuard NE system updated to version 2.1.0',
      time: '1 hour ago',
      isRead: false,
      location: undefined
    },
    {
      id: 'team1',
      type: 'info' as const,
      title: 'Team Assignment',
      message: 'New ASHA worker assigned to Rajpur village',
      time: '2 hours ago',
      isRead: true,
      location: 'Rajpur'
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'critical') return notification.type === 'critical';
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-orange-500" />;
      case 'info':
        return <Info className="w-6 h-6 text-blue-500" />;
      default:
        return <Bell className="w-6 h-6 text-gray-500" />;
    }
  };

  const getBgColor = (type: string, isRead: boolean) => {
    const opacity = isRead ? 'opacity-70' : '';
    switch (type) {
      case 'critical':
        return `bg-red-50 border-red-200 ${opacity}`;
      case 'warning':
        return `bg-orange-50 border-orange-200 ${opacity}`;
      case 'info':
        return `bg-blue-50 border-blue-200 ${opacity}`;
      default:
        return `bg-gray-50 border-gray-200 ${opacity}`;
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    markAlertAsRead(notificationId);
  };

  const markAllAsRead = () => {
    notifications.forEach(notification => {
      if (!notification.isRead) {
        markAlertAsRead(notification.id);
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-end pt-16 pr-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-96 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-xs rounded-full transition ${
                filter === 'all'
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 text-xs rounded-full transition ${
                filter === 'unread'
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Unread ({notifications.filter(n => !n.isRead).length})
            </button>
            <button
              onClick={() => setFilter('critical')}
              className={`px-3 py-1 text-xs rounded-full transition ${
                filter === 'critical'
                  ? 'bg-red-100 text-red-700 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Critical ({notifications.filter(n => n.type === 'critical').length})
            </button>
          </div>
          <button
            onClick={markAllAsRead}
            className="text-xs text-blue-600 hover:underline"
          >
            Mark all read
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No notifications found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 cursor-pointer transition-colors hover:bg-gray-50 ${getBgColor(
                    notification.type,
                    notification.isRead
                  )}`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    {getIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-gray-900">
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{notification.time}</span>
                        </div>
                        {notification.location && (
                          <span className="truncate">📍 {notification.location}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200">
          <button className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
