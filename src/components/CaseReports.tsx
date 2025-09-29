import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Eye, CreditCard as Edit, User, MapPin, Calendar } from 'lucide-react';
import { useRealTimeData } from '../hooks/useRealTimeData';

const CaseReports = () => {
  const { cases, updateCaseStatus } = useRealTimeData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('All Severity');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState<'date' | 'severity' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filter and sort cases
  const filteredAndSortedCases = useMemo(() => {
    let filtered = cases.filter(case_ => {
      const matchesSearch = searchTerm === '' || 
        case_.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_.location.district.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSeverity = selectedSeverity === 'All Severity' || case_.severity === selectedSeverity;
      const matchesStatus = selectedStatus === 'All Status' || case_.status === selectedStatus;
      const matchesDistrict = selectedDistrict === 'All Districts' || case_.location.district === selectedDistrict;
      
      return matchesSearch && matchesSeverity && matchesStatus && matchesDistrict;
    });

    // Sort cases
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.reportedAt).getTime() - new Date(b.reportedAt).getTime();
          break;
        case 'severity':
          const severityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
          comparison = severityOrder[a.severity] - severityOrder[b.severity];
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [cases, searchTerm, selectedSeverity, selectedStatus, selectedDistrict, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCases.length / itemsPerPage);
  const paginatedCases = filteredAndSortedCases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = (caseId: string, newStatus: string) => {
    updateCaseStatus(caseId, newStatus as any);
  };

  const handleExport = () => {
    const csvContent = [
      ['Case ID', 'Patient Name', 'District', 'Severity', 'Status', 'Reported At'].join(','),
      ...filteredAndSortedCases.map(case_ => [
        case_.id,
        case_.patient.name,
        case_.location.district,
        case_.severity,
        case_.status,
        case_.reportedAt
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `case-reports-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Treatment':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Disease Trends (30 Days)</h3>
            <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
              <option>All Diseases</option>
              <option>Cholera</option>
              <option>Typhoid</option>
              <option>Diarrhea</option>
            </select>
          </div>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Disease Trends Chart</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Water Quality Index</h3>
            <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
              <option>All Villages</option>
              <option>Dibrugarh</option>
              <option>Tezpur</option>
            </select>
          </div>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Water Quality Chart</p>
          </div>
        </div>
      </div>

      {/* Recent Case Reports */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Case Reports</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select 
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 mr-2"
              >
                <option>All Severity</option>
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 mr-2"
              >
                <option>All Status</option>
                <option>Under Treatment</option>
                <option>Resolved</option>
                <option>Critical</option>
                <option>Pending</option>
              </select>
              <select 
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 mr-2"
              >
                <option>All Districts</option>
                <option>Dibrugarh</option>
                <option>Tezpur</option>
                <option>Guwahati</option>
              </select>
              <button 
                onClick={handleExport}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-8 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div 
              className="cursor-pointer hover:text-gray-700"
              onClick={() => {
                setSortBy('date');
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              }}
            >
              Case ID {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </div>
            <div>Patient Info</div>
            <div>Location</div>
            <div>Symptoms</div>
            <div 
              className="cursor-pointer hover:text-gray-700"
              onClick={() => {
                setSortBy('severity');
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              }}
            >
              Severity {sortBy === 'severity' && (sortOrder === 'asc' ? '↑' : '↓')}
            </div>
            <div>Reported By</div>
            <div 
              className="cursor-pointer hover:text-gray-700"
              onClick={() => {
                setSortBy('status');
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              }}
            >
              Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
            </div>
            <div>Actions</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {paginatedCases.map((case_) => (
            <div key={case_.id} className="px-6 py-4">
              <div className="grid grid-cols-8 gap-4 items-center">
                <div>
                  <span className="text-blue-600 font-medium">{case_.id}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {case_.patient.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{case_.patient.name}</p>
                    <p className="text-xs text-gray-500">{case_.patient.gender}, {case_.patient.age}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-900">{case_.location.district}</p>
                  <p className="text-xs text-gray-500">{case_.location.village}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {case_.symptoms.map((symptom, index) => (
                    <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {symptom}
                    </span>
                  ))}
                </div>
                <div>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(case_.severity)}`}>
                    {case_.severity}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                    {case_.reporter.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{case_.reporter.name}</p>
                    <p className="text-xs text-gray-500">{case_.reporter.role}</p>
                  </div>
                </div>
                <div>
                  <select
                    value={case_.status}
                    onChange={(e) => handleStatusChange(case_.id, e.target.value)}
                    className={`text-xs font-medium rounded-full px-2 py-1 border-0 ${getStatusColor(case_.status)}`}
                  >
                    <option value="Under Treatment">Under Treatment</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Critical">Critical</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredAndSortedCases.length)} to {Math.min(currentPage * itemsPerPage, filteredAndSortedCases.length)} of {filteredAndSortedCases.length} results
            </p>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm rounded ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseReports;