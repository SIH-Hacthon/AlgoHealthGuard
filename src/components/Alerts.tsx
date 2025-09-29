import React, { useState } from 'react';
import { Plus, Users, MessageCircle, Radio, Smartphone } from 'lucide-react';
import { useRealTimeData } from '../hooks/useRealTimeData';

interface AlertsProps {
  onEmergencyAlert?: () => void;
}

const Alerts: React.FC<AlertsProps> = ({ onEmergencyAlert }) => {
  const { alerts } = useRealTimeData();
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showCreateAlertModal, setShowCreateAlertModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    role: 'ASHA Worker',
    location: '',
    phone: ''
  });
  const [newAlert, setNewAlert] = useState({
    type: 'Emergency Alert',
    message: '',
    severity: 'critical' as const,
    targetAudience: 'All Users'
  });

  const fieldTeamStats = [
    { title: 'ASHA Workers', count: 456, active: '92%', color: 'blue' },
    { title: 'Volunteers', count: 234, active: '78%', color: 'green' },
    { title: 'Community Leaders', count: 89, active: '85%', color: 'purple' }
  ];

  const recentActivity = [
    {
      name: 'Meera Devi',
      role: 'ASHA Worker',
      location: 'Dibrugarh',
      action: 'Reported 3 cases in last 2 hours',
      status: 'Active',
      avatar: 'M'
    },
    {
      name: 'Anjali Bora',
      role: 'Volunteer',
      location: 'Tezpur',
      action: 'Conducted water testing at 5 sources',
      status: 'Field Work',
      avatar: 'A'
    },
    {
      name: 'Raman Kalita',
      role: 'Community Leader',
      location: 'Guwahati',
      action: 'Organized awareness campaign',
      status: 'Campaign',
      avatar: 'R'
    }
  ];

  const alertHistory = [
    {
      type: 'Emergency Alert Sent',
      message: 'Cholera outbreak warning - Dibrugarh district',
      stats: { sent: '1,234 users', delivered: '1,187', read: '892' },
      time: '5 min ago',
      severity: 'critical'
    },
    {
      type: 'Water Safety Advisory',
      message: 'Boil water before drinking - Tezpur area',
      stats: { sent: '567 users', delivered: '542', read: '398' },
      time: '15 min ago',
      severity: 'warning'
    },
    {
      type: 'Health Education Campaign',
      message: 'Hand hygiene awareness - All districts',
      stats: { sent: '3,456 users', delivered: '3,234', read: '2,456' },
      time: '1 hour ago',
      severity: 'info'
    }
  ];

  const communicationChannels = [
    { name: 'SMS Gateway', status: 'Active', delivery: '98.7%', description: 'Primary communication channel' },
    { name: 'Push Notifications', status: 'Active', delivery: '92.3%', description: 'Mobile app notifications' },
    { name: 'WhatsApp Business', status: 'Active', delivery: '89.1%', description: 'Community groups' },
    { name: 'Local Radio', status: 'Active', delivery: 'Active', description: 'Community announcements' }
  ];

  const handleAddMember = () => {
    if (newMember.name && newMember.location) {
      // In a real app, this would make an API call
      alert(`Added ${newMember.name} as ${newMember.role} in ${newMember.location}`);
      setNewMember({ name: '', role: 'ASHA Worker', location: '', phone: '' });
      setShowAddMemberModal(false);
    }
  };

  const handleCreateAlert = () => {
    if (newAlert.message) {
      // In a real app, this would send the alert
      alert(`${newAlert.type} sent to ${newAlert.targetAudience}: "${newAlert.message}"`);
      setNewAlert({ type: 'Emergency Alert', message: '', severity: 'critical', targetAudience: 'All Users' });
      setShowCreateAlertModal(false);
    }
  };

  const handleExportList = () => {
    // Simulate export functionality
    const csvContent = [
      ['Name', 'Role', 'Location', 'Status'].join(','),
      ...recentActivity.map(member => [
        member.name,
        member.role,
        member.location,
        member.status
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `field-team-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const languages = ['Assamese', 'Bengali', 'Hindi', 'English', 'Bodo', 'Mizo'];

  return (
    <>
      <div className="space-y-6">
      {/* Field Team Management */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Field Team Management</h3>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowAddMemberModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Member</span>
            </button>
            <button 
              onClick={handleExportList}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
            >
              Export List
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {fieldTeamStats.map((stat, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 ${
              stat.color === 'blue' ? 'bg-blue-50 border-blue-200' :
              stat.color === 'green' ? 'bg-green-50 border-green-200' :
              'bg-purple-50 border-purple-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${
                    stat.color === 'blue' ? 'text-blue-900' :
                    stat.color === 'green' ? 'text-green-900' :
                    'text-purple-900'
                  }`}>{stat.title}</p>
                  <p className={`text-2xl font-bold ${
                    stat.color === 'blue' ? 'text-blue-900' :
                    stat.color === 'green' ? 'text-green-900' :
                    'text-purple-900'
                  }`}>{stat.count}</p>
                  <p className={`text-sm ${
                    stat.color === 'blue' ? 'text-blue-700' :
                    stat.color === 'green' ? 'text-green-700' :
                    'text-purple-700'
                  }`}>{stat.active} active today</p>
                </div>
                <Users className={`w-8 h-8 ${
                  stat.color === 'blue' ? 'text-blue-500' :
                  stat.color === 'green' ? 'text-green-500' :
                  'text-purple-500'
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h4 className="text-md font-medium text-gray-900 mb-4">Recent Activity</h4>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                  activity.status === 'Active' ? 'bg-green-500' :
                  activity.status === 'Field Work' ? 'bg-blue-500' :
                  'bg-purple-500'
                }`}>
                  {activity.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">{activity.name}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      activity.status === 'Active' ? 'bg-green-100 text-green-800' :
                      activity.status === 'Field Work' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.role} • {activity.location}</p>
                  <p className="text-sm text-gray-800">{activity.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Cases Reported Today</h5>
            <p className="text-2xl font-bold text-gray-900">247</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">75% of daily target achieved</p>
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Water Tests Completed</h5>
            <p className="text-2xl font-bold text-gray-900">89</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '89%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">89% of scheduled tests done</p>
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Response Time (Avg)</h5>
            <p className="text-2xl font-bold text-gray-900">23 min</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div className="bg-orange-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Target: 15 minutes</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Management */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Alert Management</h3>
            <button 
              onClick={onEmergencyAlert || (() => setShowCreateAlertModal(true))}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Emergency Alert
            </button>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {alerts.slice(0, 10).map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'high' ? 'bg-red-50 border-red-400' :
                alert.severity === 'medium' ? 'bg-orange-50 border-orange-400' :
                'bg-blue-50 border-blue-400'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{alert.title}</p>
                    <p className="text-sm text-gray-700 mt-1">{alert.description}</p>
                    {alert.location && (
                      <p className="text-xs text-gray-500 mt-1">Location: {alert.location}</p>
                    )}
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        alert.isRead ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {alert.isRead ? 'Read' : 'Unread'}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Communication Channels */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Communication Channels</h3>
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              Active
            </span>
          </div>

          <div className="space-y-4 mb-6">
            {communicationChannels.map((channel, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  {channel.name === 'SMS Gateway' && <MessageCircle className="w-5 h-5 text-blue-500" />}
                  {channel.name === 'Push Notifications' && <Smartphone className="w-5 h-5 text-purple-500" />}
                  {channel.name === 'WhatsApp Business' && <MessageCircle className="w-5 h-5 text-green-500" />}
                  {channel.name === 'Local Radio' && <Radio className="w-5 h-5 text-orange-500" />}
                  <div>
                    <p className="font-medium text-gray-900">{channel.name}</p>
                    <p className="text-sm text-gray-500">{channel.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">{channel.delivery}</p>
                  <p className="text-xs text-gray-500">{channel.status}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3">Language Support</h4>
            <div className="flex flex-wrap gap-2">
              {languages.map((language, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  {language}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add Team Member</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>ASHA Worker</option>
                  <option>Volunteer</option>
                  <option>Community Leader</option>
                  <option>Medical Officer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newMember.location}
                  onChange={(e) => setNewMember({ ...newMember, location: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="District, Village"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleAddMember}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Add Member
              </button>
              <button
                onClick={() => setShowAddMemberModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Alert Modal */}
      {showCreateAlertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Create Alert</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alert Type</label>
                <select
                  value={newAlert.type}
                  onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Emergency Alert</option>
                  <option>Water Safety Advisory</option>
                  <option>Health Education Campaign</option>
                  <option>Routine Update</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={newAlert.message}
                  onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter alert message..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                <select
                  value={newAlert.severity}
                  onChange={(e) => setNewAlert({ ...newAlert, severity: e.target.value as 'critical' | 'warning' | 'info' })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="critical">Critical</option>
                  <option value="warning">Warning</option>
                  <option value="info">Information</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                <select
                  value={newAlert.targetAudience}
                  onChange={(e) => setNewAlert({ ...newAlert, targetAudience: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>All Users</option>
                  <option>ASHA Workers</option>
                  <option>Medical Officers</option>
                  <option>Community Leaders</option>
                  <option>Specific District</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCreateAlert}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Send Alert
              </button>
              <button
                onClick={() => setShowCreateAlertModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alerts;