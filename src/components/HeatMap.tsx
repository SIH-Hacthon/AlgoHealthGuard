import React, { useState, useEffect } from 'react';
import { MapPin, Maximize2, Filter, RefreshCw } from 'lucide-react';

interface HeatMapProps {
  className?: string;
}

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  cases: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
}

export default function HeatMap({ className = '' }: HeatMapProps) {
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate loading map data
    const mockMarkers: MapMarker[] = [
      { id: '1', lat: 28.6139, lng: 77.2090, cases: 45, severity: 'high', location: 'New Delhi' },
      { id: '2', lat: 19.0760, lng: 72.8777, cases: 32, severity: 'medium', location: 'Mumbai' },
      { id: '3', lat: 13.0827, lng: 80.2707, cases: 67, severity: 'critical', location: 'Chennai' },
      { id: '4', lat: 22.5726, lng: 88.3639, cases: 23, severity: 'low', location: 'Kolkata' },
      { id: '5', lat: 12.9716, lng: 77.5946, cases: 54, severity: 'high', location: 'Bangalore' },
    ];
    setMarkers(mockMarkers);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredMarkers = filter === 'all' 
    ? markers 
    : markers.filter(marker => marker.severity === filter);

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Disease Heat Map</h3>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'h-96'}`}>
        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-md shadow-md hover:bg-gray-50"
          >
            ✕
          </button>
        )}
        
        {/* Simulated Map Container */}
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
          {/* Map Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 grid-rows-8 h-full">
              {Array.from({ length: 96 }).map((_, i) => (
                <div key={i} className="border border-gray-300"></div>
              ))}
            </div>
          </div>

          {/* Markers */}
          {filteredMarkers.map((marker) => (
            <div
              key={marker.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${20 + (marker.lng - 70) * 8}%`,
                top: `${80 - (marker.lat - 10) * 3}%`,
              }}
              onClick={() => setSelectedMarker(marker)}
            >
              <div className={`w-6 h-6 rounded-full ${getSeverityColor(marker.severity)} opacity-80 animate-pulse`}>
                <div className="absolute inset-0 rounded-full bg-current opacity-30 animate-ping"></div>
              </div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                {marker.location}: {marker.cases} cases
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Severity Levels</h4>
            <div className="space-y-1">
              {[
                { level: 'Critical', color: 'bg-red-500', count: markers.filter(m => m.severity === 'critical').length },
                { level: 'High', color: 'bg-orange-500', count: markers.filter(m => m.severity === 'high').length },
                { level: 'Medium', color: 'bg-yellow-500', count: markers.filter(m => m.severity === 'medium').length },
                { level: 'Low', color: 'bg-green-500', count: markers.filter(m => m.severity === 'low').length },
              ].map((item) => (
                <div key={item.level} className="flex items-center space-x-2 text-xs">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-gray-700">{item.level} ({item.count})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md">
            <div className="text-sm text-gray-600">Total Active Cases</div>
            <div className="text-2xl font-bold text-gray-900">
              {filteredMarkers.reduce((sum, marker) => sum + marker.cases, 0)}
            </div>
            <div className="text-xs text-gray-500">
              Across {filteredMarkers.length} locations
            </div>
          </div>
        </div>

        {/* Marker Details Modal */}
        {selectedMarker && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedMarker.location}</h3>
                <button
                  onClick={() => setSelectedMarker(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Cases:</span>
                  <span className="font-semibold text-gray-900">{selectedMarker.cases}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Severity Level:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedMarker.severity === 'critical' ? 'bg-red-100 text-red-800' :
                    selectedMarker.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                    selectedMarker.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedMarker.severity.charAt(0).toUpperCase() + selectedMarker.severity.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Coordinates:</span>
                  <span className="text-sm text-gray-500">
                    {selectedMarker.lat.toFixed(4)}, {selectedMarker.lng.toFixed(4)}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm">
                  View Details
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-sm">
                  Send Alert
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

