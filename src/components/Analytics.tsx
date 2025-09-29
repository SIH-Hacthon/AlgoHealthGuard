import React, { useState } from 'react';
import { TrendingUp, Play, BarChart3, Users } from 'lucide-react';

const Analytics = () => {
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('Last 30 Days');
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    duration: '30',
    targetAudience: 'All Users',
    contentType: 'Video'
  });

  const campaigns = [
    {
      id: 'camp-001',
      name: 'Hand Hygiene Awareness',
      description: 'Promoting proper handwashing techniques',
      duration: '30 days',
      reach: '15,432 people',
      completion: '89%',
      rating: '4.8/5',
      views: '12,456',
      shares: '3,234',
      status: 'Active'
    },
    {
      id: 'camp-002',
      name: 'Safe Water Practices',
      description: 'Water purification and storage methods',
      duration: '45 days',
      reach: '23,567 people',
      completion: '92%',
      rating: '4.9/5',
      views: '18,234',
      shares: '4,567',
      status: 'Active'
    }
  ];

  const resources = [
    { type: 'Video Content', count: '234 videos', completion: '89%', color: 'blue' },
    { type: 'Infographics', count: '156 graphics', shared: '70%', color: 'green' },
    { type: 'Audio Messages', count: '89 recordings', listened: '92%', color: 'orange' },
    { type: 'Printed Materials', count: '45 brochures', distributed: '12K', color: 'purple' }
  ];

  const systemMetrics = [
    { label: 'Uptime', value: '99.8%' },
    { label: 'Response Time', value: '1.2s' },
    { label: 'API Calls/Day', value: '247K' },
    { label: 'Error Rate', value: '0.01%' }
  ];

  const usageStats = [
    { metric: 'Active Users', value: '779', change: '↑ 12% vs last month' },
    { metric: 'Reports Filed', value: '1,234', change: '↑ 8% vs last month' },
    { metric: 'Alerts Sent', value: '89', change: '↑ 23% vs last month' }
  ];

  const popularContent = [
    { title: 'Hand Washing Video', views: '12.4K views' },
    { title: 'Water Boiling Guide', views: '8.9K views' },
    { title: 'Symptom Recognition', views: '7.2K views' }
  ];

  const handleCreateCampaign = () => {
    if (newCampaign.name && newCampaign.description) {
      alert(`Campaign "${newCampaign.name}" created successfully! It will run for ${newCampaign.duration} days.`);
      setNewCampaign({
        name: '',
        description: '',
        duration: '30',
        targetAudience: 'All Users',
        contentType: 'Video'
      });
      setShowNewCampaignModal(false);
    }
  };

  const handleCampaignAction = (campaignId: string, action: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (action === 'pause') {
      alert(`Campaign "${campaign?.name}" has been paused.`);
    } else if (action === 'view') {
      alert(`Detailed analytics for "${campaign?.name}" would open in a new window.`);
    }
  };

  return (
    <>
      <div className="space-y-6">
      {/* Educational Resources */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Educational Resources & Campaigns</h3>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowNewCampaignModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              + New Campaign
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
              Resource Library
            </button>
          </div>
        </div>

        {/* Resource Types */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {resources.map((resource, index) => (
            <div key={index} className={`p-4 rounded-lg ${
              resource.color === 'blue' ? 'bg-blue-50 border border-blue-200' :
              resource.color === 'green' ? 'bg-green-50 border border-green-200' :
              resource.color === 'orange' ? 'bg-orange-50 border border-orange-200' :
              'bg-purple-50 border border-purple-200'
            }`}>
              <h4 className={`font-medium ${
                resource.color === 'blue' ? 'text-blue-900' :
                resource.color === 'green' ? 'text-green-900' :
                resource.color === 'orange' ? 'text-orange-900' :
                'text-purple-900'
              }`}>{resource.type}</h4>
              <p className={`text-sm ${
                resource.color === 'blue' ? 'text-blue-700' :
                resource.color === 'green' ? 'text-green-700' :
                resource.color === 'orange' ? 'text-orange-700' :
                'text-purple-700'
              }`}>{resource.count}</p>
              <p className={`text-xs ${
                resource.color === 'blue' ? 'text-blue-600' :
                resource.color === 'green' ? 'text-green-600' :
                resource.color === 'orange' ? 'text-orange-600' :
                'text-purple-600'
              }`}>
                {resource.completion || resource.shared || resource.listened || resource.distributed}
              </p>
            </div>
          ))}
        </div>

        {/* Active Campaigns */}
        <div className="mb-8">
          <h4 className="text-md font-medium text-gray-900 mb-4">Active Campaigns</h4>
          <div className="space-y-4">
            {campaigns.map((campaign, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Play className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{campaign.name}</h5>
                      <p className="text-sm text-gray-500">{campaign.description}</p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                        <span>Started: Jan 15, 2024</span>
                        <span>Duration: {campaign.duration}</span>
                        <span>Reach: {campaign.reach}</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {campaign.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{campaign.views}</p>
                    <p className="text-xs text-gray-500">Views</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{campaign.shares}</p>
                    <p className="text-xs text-gray-500">Shares</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{campaign.completion}</p>
                    <p className="text-xs text-gray-500">Completion</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{campaign.rating}</p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleCampaignAction(campaign.id, 'view')}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-200"
                  >
                    View Analytics
                  </button>
                  <button
                    onClick={() => handleCampaignAction(campaign.id, 'pause')}
                    className="bg-orange-100 text-orange-700 px-3 py-1 rounded-md text-xs font-medium hover:bg-orange-200"
                  >
                    Pause Campaign
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Engagement Metrics</h5>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Video Views</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                  <span className="text-sm font-medium">87%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Content Shares</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <span className="text-sm font-medium">72%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Quiz Completion</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '64%' }}></div>
                  </div>
                  <span className="text-sm font-medium">64%</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-medium text-gray-900 mb-3">Popular Content</h5>
            <div className="space-y-2">
              {popularContent.map((content, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-800">{content.title}</span>
                  <span className="text-sm text-gray-600">{content.views}</span>
                </div>
              ))}
            </div>
            <button className="text-green-600 hover:text-green-800 text-sm mt-2">
              Read more stories →
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">System Performance</h3>
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              ● All Systems Operational
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Database Performance</span>
                <span className="text-sm text-green-600 font-medium">Optimal</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">IoT Connectivity</span>
                <span className="text-sm text-blue-600 font-medium">95% Connected</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Mobile App Usage</span>
                <span className="text-sm text-purple-600 font-medium">Active</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Analytics */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Usage Analytics</h3>
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Last 24 Hours</option>
            </select>
          </div>

          <div className="space-y-6">
            {usageStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{stat.metric}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}

            <div className="pt-4 border-t border-gray-200">
              <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Usage Trends Chart</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* New Campaign Modal */}
      {showNewCampaignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Campaign</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                <input
                  type="text"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Cholera Prevention Campaign"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the campaign..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days)</label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={newCampaign.duration}
                  onChange={(e) => setNewCampaign({ ...newCampaign, duration: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                <select
                  value={newCampaign.targetAudience}
                  onChange={(e) => setNewCampaign({ ...newCampaign, targetAudience: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>All Users</option>
                  <option>Rural Communities</option>
                  <option>Urban Areas</option>
                  <option>High-Risk Areas</option>
                  <option>Healthcare Workers</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
                <select
                  value={newCampaign.contentType}
                  onChange={(e) => setNewCampaign({ ...newCampaign, contentType: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Video</option>
                  <option>Infographic</option>
                  <option>Audio Message</option>
                  <option>Text Message</option>
                  <option>Mixed Media</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCreateCampaign}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Create Campaign
              </button>
              <button
                onClick={() => setShowNewCampaignModal(false)}
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

export default Analytics;