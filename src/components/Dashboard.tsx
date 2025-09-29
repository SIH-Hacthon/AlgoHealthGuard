import React, { useState, useEffect } from 'react';
import { 
  Users, Droplets, Activity, AlertTriangle, 
  TrendingUp, MapPin, Clock, Eye, X
} from 'lucide-react';
import StatCard from './StatCard';
import HeatMap from './HeatMap';
import LiveAlerts from './LiveAlerts';
import QuickActions from './QuickActions';
import { useRealTimeData } from '../hooks/useRealTimeData';

const Dashboard = () => {
  const { stats, alerts } = useRealTimeData();
  const [showBanner, setShowBanner] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');

  const dashboardStats = [
    {
      title: 'Total Cases (24h)',
      value: stats.totalCases.toString(),
      change: '+23% from yesterday',
      changeType: 'increase' as const,
      icon: Activity,
      color: 'red' as const
    },
    {
      title: 'Water Sources Monitored',
      value: stats.waterSourcesMonitored.toString(),
      change: '89% safe levels',
      changeType: 'positive' as const,
      icon: Droplets,
      color: 'blue' as const
    },
    {
      title: 'Active ASHA Workers',
      value: stats.activeWorkers.toString(),
      change: '92% active today',
      changeType: 'positive' as const,
      icon: Users,
      color: 'green' as const
    },
    {
      title: 'Risk Score',
      value: stats.riskScore.toFixed(1),
      change: stats.riskScore > 7 ? 'High Risk Zone' : 'Moderate Risk',
      changeType: stats.riskScore > 7 ? 'warning' as const : 'positive' as const,
      icon: AlertTriangle,
      color: stats.riskScore > 7 ? 'orange' as const : 'green' as const
    }
  ];

  const criticalAlerts = alerts.filter(alert => alert.type === 'critical' && !alert.isRead);

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {showBanner && criticalAlerts.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
              <div>
                <p className="text-red-800 font-medium">
                  High Risk Alert: {criticalAlerts[0]?.title} - {criticalAlerts[0]?.description}
                </p>
                <p className="text-red-600 text-sm">
                  {criticalAlerts.length} critical alert{criticalAlerts.length > 1 ? 's' : ''} require immediate attention.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-red-600 hover:text-red-800 font-medium text-sm">
                View Details
              </button>
              <button 
                onClick={() => setShowBanner(false)}
                className="text-red-400 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap */}
        <div className="lg:col-span-2">
          <HeatMap />
        </div>

        {/* Live Alerts & Quick Actions */}
        <div className="space-y-6">
          <LiveAlerts />
          <QuickActions onEmergencyAlert={() => {}} />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Disease Trends (30 Days)</h3>
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option>All Diseases</option>
              <option>Cholera</option>
              <option>Typhoid</option>
              <option>Diarrhea</option>
            </select>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <TrendingUp className="w-12 h-12 mx-auto mb-2" />
              <p>Trend Chart Visualization</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Water Quality Index</h3>
            <select 
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>All Villages</option>
              <option>Dibrugarh</option>
              <option>Tezpur</option>
              <option>Guwahati</option>
            </select>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Droplets className="w-12 h-12 mx-auto mb-2" />
              <p>Water Quality Chart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;