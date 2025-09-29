import React, { useState, useEffect } from 'react';
import { MapPin, Users, FileText, Droplets, Search } from 'lucide-react';

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

interface VillageSelectorProps {
  onVillageSelect: (village: Village | null) => void;
  selectedVillage: Village | null;
}

const VillageSelector: React.FC<VillageSelectorProps> = ({ 
  onVillageSelect, 
  selectedVillage 
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [villages, setVillages] = useState<Village[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const districts = [
    'All Districts',
    'Dibrugarh',
    'Tezpur', 
    'Guwahati',
    'Jorhat',
    'Silchar'
  ];

  const mockVillages: Village[] = [
    {
      id: 'v1',
      name: 'Rajpur',
      district: 'Dibrugarh',
      population: 2500,
      ashaWorkers: 3,
      activeCases: 12,
      waterSources: 5,
      coordinates: { lat: 27.4728, lng: 95.0173 }
    },
    {
      id: 'v2', 
      name: 'Lahowal',
      district: 'Dibrugarh',
      population: 1800,
      ashaWorkers: 2,
      activeCases: 8,
      waterSources: 3,
      coordinates: { lat: 27.4528, lng: 95.0373 }
    },
    {
      id: 'v3',
      name: 'Balipara',
      district: 'Tezpur',
      population: 3200,
      ashaWorkers: 4,
      activeCases: 15,
      waterSources: 7,
      coordinates: { lat: 26.7271, lng: 92.7789 }
    },
    {
      id: 'v4',
      name: 'Beltola',
      district: 'Guwahati',
      population: 4500,
      ashaWorkers: 6,
      activeCases: 23,
      waterSources: 9,
      coordinates: { lat: 26.1445, lng: 91.7362 }
    },
    {
      id: 'v5',
      name: 'Teok',
      district: 'Jorhat',
      population: 2100,
      ashaWorkers: 3,
      activeCases: 7,
      waterSources: 4,
      coordinates: { lat: 26.7509, lng: 94.1086 }
    }
  ];

  useEffect(() => {
    let filtered = mockVillages;

    if (selectedDistrict !== 'All Districts') {
      filtered = filtered.filter(v => v.district === selectedDistrict);
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(v => 
        v.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setVillages(filtered);
  }, [selectedDistrict, searchTerm]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Village Selection</h3>
        <button
          onClick={() => onVillageSelect(null)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Show All Villages
        </button>
      </div>

      {/* District Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select District
        </label>
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          {districts.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>

      {/* Search Bar */}
      <div className="mb-4 relative">
        <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search village..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Village List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {villages.length === 0 ? (
          <p className="text-sm text-gray-500">No villages found.</p>
        ) : (
          villages.map(village => (
            <div
              key={village.id}
              onClick={() => onVillageSelect(village)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedVillage?.id === village.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <h4 className="font-medium text-gray-900">{village.name}</h4>
                </div>
                <span className="text-xs text-gray-500">{village.district}</span>
              </div>

              {/* <div className="grid grid-cols-4 gap-3 text-sm">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3 text-blue-500" />
                  <span className="text-gray-600">{village.population.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3 text-green-500" />
                  <span className="text-gray-600">{village.ashaWorkers} ASHA</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FileText className="w-3 h-3 text-orange-500" />
                  <span className="text-gray-600">{village.activeCases} cases</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Droplets className="w-3 h-3 text-blue-500" />
                  <span className="text-gray-600">{village.waterSources} sources</span>
                </div>
              </div> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VillageSelector;
