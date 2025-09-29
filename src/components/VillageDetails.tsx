import React, { useState } from 'react';
import { Users, FileText, Droplets, TrendingUp, MapPin, Phone, Calendar } from 'lucide-react';

interface Village {
  id: string;
  name: string;
  district: string;
  population: number;
  ashaWorkers: number;
  activeCases: number;
  waterSources: number;
  coordinates: { lat: number; lng: number };
}

interface VillageDetailsProps {
  village: Village;
}

const VillageDetails: React.FC<VillageDetailsProps> = ({ village }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const ashaWorkers = [
    {
      id: 'asha1',
      name: 'Meera Devi',
      phone: '+91 9876543210',
      area: 'North Rajpur',
      casesHandled: 45,
      lastActive: '2 hours ago',
      status: 'Active'
    },
    {
      id: 'asha2', 
      name: 'Sunita Sharma',
      phone: '+91 9876543211',
      area: 'South Rajpur',
      casesHandled: 38,
      lastActive: '1 hour ago',
      status: 'Active'
    },
    {
      id: 'asha3',
      name: 'Anjali Bora',
      phone: '+91 9876543212', 
      area: 'Central Rajpur',
      casesHandled: 52,
      lastActive: '30 min ago',
      status: 'Field Work'
    }
  ];

  const recentCases = [
    {
      id: 'case1',
      patientName: 'Ramesh Kumar',
      age: 34,
      symptoms: ['Diarrhea', 'Fever'],
      severity: 'Critical',
      reportedBy: 'Meera Devi',
      date: '2024-01-15',
      status: 'Under Treatment'
    },
    {
      id: 'case2',
      patientName: 'Sunita Das',
      age: 28,
      symptoms: ['Vomiting', 'Nausea'],
      severity: 'High',
      reportedBy: 'Sunita Sharma',
      date: '2024-01-14',
      status: 'Resolved'
    }
  ];

  const waterSources = [
    {
      id: 'ws1',
      name: 'Central Tube Well',
      type: 'Tube Well',
      status: 'Safe',
      phLevel: 7.2,
      lastTested: '2024-01-15',
      testedBy: 'Anjali Bora'
    },
    {
      id: 'ws2',
      name: 'Community Hand Pump',
      type: 'Hand Pump', 
      status: 'Warning',
      phLevel: 8.1,
      lastTested: '2024-01-14',
      testedBy: 'Meera Devi'
    }
  ];

  const diseaseStats = [
    { disease: 'Diarrhea', cases: 8, trend: 'up' },
    { disease: 'Fever', cases: 12, trend: 'down' },
    { disease: 'Vomiting', cases: 5, trend: 'stable' },
    { disease: 'Typhoid', cases: 2, trend: 'up' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Safe': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-orange-100 text-orange-800';
      case 'Contaminated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MapPin className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{village.name}</h2>
              <p className="text-gray-600">{village.district} District</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Population</p>
            <p className="text-lg font-semibold text-gray-900">{village.population.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <p className="text-lg font-semibold text-blue-900">{village.ashaWorkers}</p>
            <p className="text-xs text-blue-700">ASHA Workers</p>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <FileText className="w-6 h-6 text-orange-600 mx-auto mb-1" />
            <p className="text-lg font-semibold text-orange-900">{village.activeCases}</p>
            <p className="text-xs text-orange-700">Active Cases</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Droplets className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <p className="text-lg font-semibold text-green-900">{village.waterSources}</p>
            <p className="text-xs text-green-700">Water Sources</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <p className="text-lg font-semibold text-purple-900">7.2</p>
            <p className="text-xs text-purple-700">Risk Score</p>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'teams', label: 'Teams' },
            { id: 'cases', label: 'Cases' },
            { id: 'water', label: 'Water Quality' },
            { id: 'trends', label: 'Trends' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeSection === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Village Map</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Interactive Village Map</p>
                  <p className="text-sm">Lat: {village.coordinates.lat}, Lng: {village.coordinates.lng}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Total Households</span>
                  <span className="font-semibold">{Math.floor(village.population / 4.5)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Health Sub-Center</span>
                  <span className="font-semibold">1 Active</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Anganwadi Centers</span>
                  <span className="font-semibold">2 Active</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Last Survey</span>
                  <span className="font-semibold">Dec 2023</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'teams' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ASHA Workers & Teams</h3>
            <div className="grid gap-4">
              {ashaWorkers.map(worker => (
                <div key={worker.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {worker.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{worker.name}</h4>
                        <p className="text-sm text-gray-500">{worker.area}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      worker.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {worker.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{worker.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{worker.casesHandled} cases</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{worker.lastActive}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'cases' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Cases</h3>
            <div className="space-y-4">
              {recentCases.map(case_ => (
                <div key={case_.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{case_.patientName}</h4>
                      <p className="text-sm text-gray-500">Age: {case_.age} • Reported by: {case_.reportedBy}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(case_.severity)}`}>
                        {case_.severity}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{case_.date}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {case_.symptoms.map((symptom, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {symptom}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status: {case_.status}</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'water' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Water Quality Sources</h3>
            <div className="space-y-4">
              {waterSources.map(source => (
                <div key={source.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{source.name}</h4>
                      <p className="text-sm text-gray-500">{source.type}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(source.status)}`}>
                      {source.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">pH Level: </span>
                      <span className="font-medium">{source.phLevel}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Tested: </span>
                      <span className="font-medium">{source.lastTested}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Tested By: </span>
                      <span className="font-medium">{source.testedBy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'trends' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Disease Trends</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {diseaseStats.map((stat, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{stat.disease}</h4>
                      <p className="text-2xl font-bold text-gray-900">{stat.cases}</p>
                    </div>
                    <div className={`p-2 rounded-full ${
                      stat.trend === 'up' ? 'bg-red-100' :
                      stat.trend === 'down' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <TrendingUp className={`w-5 h-5 ${
                        stat.trend === 'up' ? 'text-red-600' :
                        stat.trend === 'down' ? 'text-green-600 transform rotate-180' : 'text-gray-600'
                      }`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                <p>Disease Trends Chart</p>
                <p className="text-sm">Last 30 days data for {village.name}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VillageDetails;