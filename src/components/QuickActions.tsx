import React, { useState } from 'react';
import { AlertCircle, Users, Send } from 'lucide-react';

interface QuickActionsProps {
  onEmergencyAlert?: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onEmergencyAlert }) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [isSendingAlert, setIsSendingAlert] = useState(false);

  const handleDeployTeam = async () => {
    setIsDeploying(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDeploying(false);
    alert('Emergency response team has been notified and deployed!');
  };

  const handleSendAlert = async () => {
    setIsSendingAlert(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSendingAlert(false);
    alert('Alert sent to all field workers and community members!');
  };

  const confirmEmergencyAlert = async () => {
    setShowEmergencyModal(false);
    // Simulate emergency alert
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('EMERGENCY ALERT ACTIVATED: All emergency protocols initiated!');
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        
        <div className="space-y-3">
          <button 
            onClick={onEmergencyAlert}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <AlertCircle className="w-5 h-5" />
            <span>Emergency Alert</span>
          </button>
          
          <button 
            onClick={handleDeployTeam}
            disabled={isDeploying}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Users className="w-5 h-5" />
            <span>{isDeploying ? 'Deploying...' : 'Deploy Team'}</span>
          </button>
          
          <button 
            onClick={handleSendAlert}
            disabled={isSendingAlert}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>{isSendingAlert ? 'Sending...' : 'Send Alert'}</span>
          </button>
        </div>
      </div>
      </>
  );
};

export default QuickActions;