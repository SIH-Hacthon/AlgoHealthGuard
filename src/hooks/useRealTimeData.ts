import { useState, useEffect } from 'react';

export interface CaseData {
  id: string;
  patient: {
    name: string;
    gender: string;
    age: number;
    avatar: string;
  };
  location: {
    district: string;
    village: string;
  };
  symptoms: string[];
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  reporter: {
    name: string;
    role: string;
  };
  status: 'Under Treatment' | 'Resolved' | 'Critical' | 'Pending';
  reportedAt: string;
}

export interface WaterSource {
  id: string;
  location: string;
  type: string;
  phLevel: number;
  status: 'Safe' | 'Contaminated' | 'Monitoring';
  lastUpdated: string;
  statusColor: 'green' | 'red' | 'orange';
  temperature?: number;
  turbidity?: number;
  tds?: number;
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
  severity: 'high' | 'medium' | 'low';
  location?: string;
  isRead: boolean;
}

export const useRealTimeData = () => {
  const [cases, setCases] = useState<CaseData[]>([]);
  const [waterSources, setWaterSources] = useState<WaterSource[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [stats, setStats] = useState({
    totalCases: 247,
    waterSourcesMonitored: 1234,
    activeWorkers: 456,
    riskScore: 7.2
  });

  // Simulate real-time data updates
  useEffect(() => {
    // Initialize data
    const initialCases: CaseData[] = [
      {
        id: 'HC-2024-0847',
        patient: { name: 'Ramesh Kumar', gender: 'Male', age: 34, avatar: 'R' },
        location: { district: 'Dibrugarh', village: 'Lahowal Village' },
        symptoms: ['Diarrhea', 'Fever'],
        severity: 'Critical',
        reporter: { name: 'Meera Devi', role: 'ASHA Worker' },
        status: 'Under Treatment',
        reportedAt: '2024-01-15 14:30'
      },
      {
        id: 'HC-2024-0846',
        patient: { name: 'Sunita Sharma', gender: 'Female', age: 28, avatar: 'S' },
        location: { district: 'Tezpur', village: 'Balipara' },
        symptoms: ['Vomiting', 'Nausea'],
        severity: 'High',
        reporter: { name: 'Anjali Bora', role: 'Volunteer' },
        status: 'Resolved',
        reportedAt: '2024-01-15 12:15'
      },
      {
        id: 'HC-2024-0845',
        patient: { name: 'Amit Das', gender: 'Male', age: 45, avatar: 'A' },
        location: { district: 'Guwahati', village: 'Beltola' },
        symptoms: ['Headache', 'Fatigue'],
        severity: 'Medium',
        reporter: { name: 'Dr. Sharma', role: 'Medical Officer' },
        status: 'Under Treatment',
        reportedAt: '2024-01-15 10:45'
      }
    ];

    const initialWaterSources: WaterSource[] = [
      {
        id: 'WS-001',
        location: 'Dibrugarh, Lahowal',
        type: 'Tube Well',
        phLevel: 8.9,
        status: 'Contaminated',
        lastUpdated: '2 min ago',
        statusColor: 'red',
        temperature: 28.5,
        turbidity: 12.3,
        tds: 650
      },
      {
        id: 'WS-002',
        location: 'Tezpur, Balipara',
        type: 'Hand Pump',
        phLevel: 7.2,
        status: 'Safe',
        lastUpdated: '5 min ago',
        statusColor: 'green',
        temperature: 26.8,
        turbidity: 2.1,
        tds: 320
      },
      {
        id: 'WS-003',
        location: 'Guwahati, Beltola',
        type: 'River Source',
        phLevel: 6.8,
        status: 'Monitoring',
        lastUpdated: '8 min ago',
        statusColor: 'orange',
        temperature: 29.2,
        turbidity: 8.7,
        tds: 480
      }
    ];

    const initialAlerts: Alert[] = [
      {
        id: 'alert-001',
        type: 'critical',
        title: 'Cholera Cluster',
        description: 'Dibrugarh - 15 cases',
        time: '2 min ago',
        severity: 'high',
        location: 'Dibrugarh',
        isRead: false
      },
      {
        id: 'alert-002',
        type: 'warning',
        title: 'Water Contamination',
        description: 'Tezpur - pH 8.9 detected',
        time: '5 min ago',
        severity: 'medium',
        location: 'Tezpur',
        isRead: false
      },
      {
        id: 'alert-003',
        type: 'info',
        title: 'Sensor Offline',
        description: 'Bongaigaon - Well #247',
        time: '12 min ago',
        severity: 'low',
        location: 'Bongaigaon',
        isRead: true
      }
    ];

    setCases(initialCases);
    setWaterSources(initialWaterSources);
    setAlerts(initialAlerts);

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update stats randomly
      setStats(prev => ({
        ...prev,
        totalCases: prev.totalCases + Math.floor(Math.random() * 3),
        riskScore: Math.max(1, Math.min(10, prev.riskScore + (Math.random() - 0.5) * 0.5))
      }));

      // Occasionally add new alerts
      if (Math.random() < 0.1) {
        const newAlert: Alert = {
          id: `alert-${Date.now()}`,
          type: Math.random() < 0.3 ? 'critical' : Math.random() < 0.6 ? 'warning' : 'info',
          title: 'New Alert',
          description: 'System generated alert',
          time: 'Just now',
          severity: Math.random() < 0.3 ? 'high' : Math.random() < 0.6 ? 'medium' : 'low',
          isRead: false
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const addCase = (newCase: Omit<CaseData, 'id'>) => {
    const caseWithId = {
      ...newCase,
      id: `HC-2024-${String(Date.now()).slice(-4)}`
    };
    setCases(prev => [caseWithId, ...prev]);
    setStats(prev => ({ ...prev, totalCases: prev.totalCases + 1 }));
  };

  const updateCaseStatus = (caseId: string, status: CaseData['status']) => {
    setCases(prev => prev.map(c => c.id === caseId ? { ...c, status } : c));
  };

  const markAlertAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, isRead: true } : a));
  };

  const addWaterSource = (newSource: Omit<WaterSource, 'id'>) => {
    const sourceWithId = {
      ...newSource,
      id: `WS-${String(Date.now()).slice(-3)}`
    };
    setWaterSources(prev => [sourceWithId, ...prev]);
  };

  return {
    cases,
    waterSources,
    alerts,
    stats,
    addCase,
    updateCaseStatus,
    markAlertAsRead,
    addWaterSource
  };
};