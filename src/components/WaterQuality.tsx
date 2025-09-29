import React, { useState, useEffect } from 'react';
import { Droplets, Plus, RefreshCw, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface WaterSource {
  id: string;
  name: string;
  location: string;
  status: 'safe' | 'warning' | 'contaminated';
  ph: number;
  turbidity: number;
  chlorine: number;
  bacteria: number;
  lastTested: string;
  testingFrequency: string;
}

interface WaterQualityProps {
  className?: string;
}

export default function WaterQuality({ className = '' }: WaterQualityProps) {
  const [waterSources, setWaterSources] = useState<WaterSource[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSource, setSelectedSource] = useState<WaterSource | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize with mock data
    const mockSources: WaterSource[] = [
      {
        id: '1',
        name: 'Central Water Treatment Plant',
        location: 'Downtown District',
        status: 'safe',
        ph: 7.2,
        turbidity: 0.8,
        chlorine: 1.2,
        bacteria: 0,
        lastTested: '2024-01-15T10:30:00Z',
        testingFrequency: 'Daily'
      },
      {
        id: '2',
        name: 'North Side Reservoir',
        location: 'North District',
        status: 'warning',
        ph: 6.8,
        turbidity: 2.1,
        chlorine: 0.8,
        bacteria: 5,
        lastTested: '2024-01-14T14:20:00Z',
        testingFrequency: 'Twice Daily'
      },
      {
        id: '3',
        name: 'East Community Well',
        location: 'East District',
        status: 'contaminated',
        ph: 8.5,
        turbidity: 4.2,
        chlorine: 0.3,
        bacteria: 25,
        lastTested: '2024-01-13T09:15:00Z',
        testingFrequency: 'Weekly'
      },
      {
        id: '4',
        name: 'South Water Station',
        location: 'South District',
        status: 'safe',
        ph: 7.0,
        turbidity: 1.0,
        chlorine: 1.5,
        bacteria: 0,
        lastTested: '2024-01-15T08:45:00Z',
        testingFrequency: 'Daily'
      }
    ];
    setWaterSources(mockSources);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'contaminated':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'contaminated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSources = filter === 'all' 
    ? waterSources 
    : waterSources.filter(source => source.status === filter);

  const syncIoTData = async () => {
    setIsLoading(true);
    // Simulate IoT data sync
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update sources with new random data
    setWaterSources(prev => prev.map(source => ({
      ...source,
      ph: Math.round((6.5 + Math.random() * 2) * 10) / 10,
      turbidity: Math.round(Math.random() * 5 * 10) / 10,
      chlorine: Math.round((0.5 + Math.random() * 1.5) * 10) / 10,
      bacteria: Math.floor(Math.random() * 30),
      lastTested: new Date().toISOString(),
      status: Math.random() > 0.7 ? 'warning' : Math.random() > 0.9 ? 'contaminated' : 'safe'
    })));
    
    setIsLoading(false);
  };

  const addNewSource = (sourceData: Partial<WaterSource>) => {
    const newSource: WaterSource = {
      id: Date.now().toString(),
      name: sourceData.name || '',
      location: sourceData.location || '',
      status: 'safe',
      ph: 7.0,
      turbidity: 1.0,
      chlorine: 1.0,
      bacteria: 0,
      lastTested: new Date().toISOString(),
      testingFrequency: 'Daily',
      ...sourceData
    };
    setWaterSources(prev => [...prev, newSource]);
    setShowAddModal(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    total: waterSources.length,
    safe: waterSources.filter(s => s.status === 'safe').length,
    warning: waterSources.filter(s => s.status === 'warning').length,
    contaminated: waterSources.filter(s => s.status === 'contaminated').length,
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Droplets className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Water Quality Monitoring</h3>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Sources</option>
              <option>All Villages</option>
              <option value="warning">Warning</option>
              <option value="contaminated">Contaminated</option>
            </select>
            <button
              onClick={syncIoTData}
              disabled={isLoading}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Sync IoT</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Source</span>
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Sources</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.safe}</div>
            <div className="text-sm text-gray-600">Safe</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.warning}</div>
            <div className="text-sm text-gray-600">Warning</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.contaminated}</div>
            <div className="text-sm text-gray-600">Contaminated</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-4">
          {filteredSources.map((source) => (
            <div
              key={source.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedSource(source)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(source.status)}
                  <div>
                    <h4 className="font-medium text-gray-900">{source.name}</h4>
                    <p className="text-sm text-gray-600">{source.location}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(source.status)}`}>
                  {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">pH Level</div>
                  <div className="font-medium">{source.ph}</div>
                </div>
                <div>
                  <div className="text-gray-600">Turbidity</div>
                  <div className="font-medium">{source.turbidity} NTU</div>
                </div>
                <div>
                  <div className="text-gray-600">Chlorine</div>
                  <div className="font-medium">{source.chlorine} mg/L</div>
                </div>
                <div>
                  <div className="text-gray-600">Bacteria</div>
                  <div className="font-medium">{source.bacteria} CFU/100ml</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>Last tested: {formatDate(source.lastTested)}</span>
                <span>Testing: {source.testingFrequency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Source Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Water Source</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              addNewSource({
                name: formData.get('name') as string,
                location: formData.get('location') as string,
                testingFrequency: formData.get('frequency') as string,
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Source Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter source name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Testing Frequency
                  </label>
                  <select
                    name="frequency"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Twice Daily">Twice Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Source
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Source Details Modal */}
      {selectedSource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedSource.name}</h3>
              <button
                onClick={() => setSelectedSource(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(selectedSource.status)}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedSource.status)}`}>
                  {selectedSource.status.charAt(0).toUpperCase() + selectedSource.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">pH Level</div>
                  <div className="text-xl font-bold text-gray-900">{selectedSource.ph}</div>
                  <div className="text-xs text-gray-500">Normal: 6.5-8.5</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">Turbidity</div>
                  <div className="text-xl font-bold text-gray-900">{selectedSource.turbidity}</div>
                  <div className="text-xs text-gray-500">NTU (Max: 4.0)</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">Chlorine</div>
                  <div className="text-xl font-bold text-gray-900">{selectedSource.chlorine}</div>
                  <div className="text-xs text-gray-500">mg/L (Min: 0.5)</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">Bacteria Count</div>
                  <div className="text-xl font-bold text-gray-900">{selectedSource.bacteria}</div>
                  <div className="text-xs text-gray-500">CFU/100ml (Max: 0)</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="text-sm text-gray-600 mb-2">Testing Information</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Last Tested:</span>
                    <span className="font-medium">{formatDate(selectedSource.lastTested)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frequency:</span>
                    <span className="font-medium">{selectedSource.testingFrequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-medium">{selectedSource.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Schedule Test
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors">
                View History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}