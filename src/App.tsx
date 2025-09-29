import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContexts';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import CaseReports from './components/CaseReports';
import WaterQuality from './components/WaterQuality';
import Predictions from './components/Predictions';
import Alerts from './components/Alerts';
import Analytics from './components/Analytics';
import VerticalNavbar from './components/VerticalNavbar';
import ProfileSection from './components/ProfileSection';
import WelcomeModal from './components/WelcomeModal';
import VillageSelector from './components/VillageSelector';
import VillageDetails from './components/VillageDetails';
import EmergencyAlert from './components/EmergencyAlert';
import NotificationPanel from './components/NotificationPanel';

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

function AppContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);
  const [selectedVillage, setSelectedVillage] = useState<Village | null>(null);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  if (!user) {
    return <LoginPage />;
  }

  const handleTabChange = (tab: string) => {
    if (tab === 'notifications') {
      setShowNotifications(true);
    } else {
      setActiveTab(tab);
      setSelectedVillage(null); // Reset village selection when changing tabs
    }
  };

  const renderActiveComponent = () => {
    if (selectedVillage) {
      return <VillageDetails village={selectedVillage} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <VillageSelector 
                onVillageSelect={setSelectedVillage}
                selectedVillage={selectedVillage}
              />
            </div>
            <div className="lg:col-span-3">
              <Dashboard />
            </div>
          </div>
        );
      case 'reports':
        return <CaseReports />;
      case 'water':
        return <WaterQuality />;
      case 'predictions':
        return <Predictions />;
      case 'alerts':
        return <Alerts onEmergencyAlert={() => setShowEmergencyAlert(true)} />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <WelcomeModal />
      
      {/* Vertical Navigation */}
      <VerticalNavbar 
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        notifications={notifications}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">HealthGuard NE</h1>
                  <p className="text-sm text-gray-500">Smart Health Monitoring</p>
                </div>
              </div>
              {selectedVillage && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 rounded-full">
                  <span className="text-sm font-medium text-blue-800">
                    📍 {selectedVillage.name}, {selectedVillage.district}
                  </span>
                  <button
                    onClick={() => setSelectedVillage(null)}
                    className="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <ProfileSection />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 py-6 overflow-auto">
          {renderActiveComponent()}
        </main>
      </div>

      {/* Emergency Alert Modal */}
      <EmergencyAlert 
        isOpen={showEmergencyAlert}
        onClose={() => setShowEmergencyAlert(false)}
      />

      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;