import React, { useState } from 'react';
import { AlertTriangle, Droplets, WifiOff, Clock } from 'lucide-react';
import { useRealTimeData } from '../hooks/useRealTimeData';

const LiveAlerts = () => {
  const { alerts, markAlertAsRead } = useRealTimeData();
  const [filter, setFilter] = useState<'all' | 'unread'>('unread');

  const filteredAlerts = alerts
    .filter(alert => filter === 'all' || !alert.isRead)
    .slice(0, 5);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return AlertTriangle;
      case 'warning':
        return Droplets;
      case 'info':
        return WifiOff;
      default:
        return AlertTriangle;
    }
  };

  const getAlertClasses = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'info':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'text-red-500';
      case 'warning':
        return 'text-orange-500';
      case 'info':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Live Alerts</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilter('unread')}
            className={`px-2 py-1 text-xs rounded ${
              filter === 'unread' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Unread ({alerts.filter(a => !a.isRead).length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-2 py-1 text-xs rounded ${
              filter === 'all' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            All
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const IconComponent = getAlertIcon(alert.type);
          return (
          <div 
            key={alert.id} 
            className={`p-3 rounded-lg border cursor-pointer transition-opacity ${getAlertClasses(alert.type)} ${
              alert.isRead ? 'opacity-60' : ''
            }`}
            onClick={() => markAlertAsRead(alert.id)}
          >
            <div className="flex items-start space-x-3">
              <IconComponent className={`w-5 h-5 mt-0.5 ${getIconColor(alert.type)}`} />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-gray-900">{alert.title}</p>
                  {!alert.isRead && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{alert.description}</p>
                {alert.location && (
                  <p className="text-xs text-gray-500">Location: {alert.location}</p>
                )}
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {alert.time}
                </div>
              </div>
            </div>
          </div>
          );
        })}
        {filteredAlerts.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            {filter === 'unread' ? 'No unread alerts' : 'No alerts available'}
          </p>
        )}
      </div>
    </div>
  );
};

export default LiveAlerts;