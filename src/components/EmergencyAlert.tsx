import React, { useState } from 'react';
import { AlertTriangle, MapPin, Users, Send, CheckCircle, X } from 'lucide-react';

interface EmergencyAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmergencyAlert: React.FC<EmergencyAlertProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [alertData, setAlertData] = useState({
    location: '',
    village: '',
    emergencyType: '',
    description: '',
    severity: 'critical' as 'critical' | 'high' | 'medium',
    affectedPopulation: ''
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const emergencyTypes = [
    'Disease Outbreak',
    'Water Contamination',
    'Food Poisoning',
    'Natural Disaster',
    'Medical Emergency',
    'Other'
  ];

  const villages = [
    'Rajpur', 'Lahowal', 'Balipara', 'Beltola', 'Teok'
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleDeployTeam = async () => {
    setIsDeploying(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDeploying(false);
    alert(`Emergency response team deployed to ${alertData.village}!`);
  };

  const handleSendAlert = async () => {
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSending(false);
    alert(`Emergency alert sent to all recipients in ${alertData.village}!`);
    onClose();
    setStep(1);
    setAlertData({
      location: '',
      village: '',
      emergencyType: '',
      description: '',
      severity: 'critical',
      affectedPopulation: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-bold text-gray-900">Emergency Alert System</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-12 h-1 mx-2 ${
                      step > stepNum ? 'bg-red-600' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Location</span>
              <span>Deploy Team</span>
              <span>Send Alert</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Emergency Location & Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Village
                  </label>
                  <select
                    value={alertData.village}
                    onChange={(e) => setAlertData({...alertData, village: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">Select Village</option>
                    {villages.map(village => (
                      <option key={village} value={village}>{village}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Type
                  </label>
                  <select
                    value={alertData.emergencyType}
                    onChange={(e) => setAlertData({...alertData, emergencyType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">Select Emergency Type</option>
                    {emergencyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specific Location/Area
                </label>
                <input
                  type="text"
                  value={alertData.location}
                  onChange={(e) => setAlertData({...alertData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g., Near Primary School, Ward 3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity Level
                </label>
                <div className="flex space-x-4">
                  {[
                    { value: 'critical', label: 'Critical', color: 'red' },
                    { value: 'high', label: 'High', color: 'orange' },
                    { value: 'medium', label: 'Medium', color: 'yellow' }
                  ].map(severity => (
                    <label key={severity.value} className="flex items-center">
                      <input
                        type="radio"
                        name="severity"
                        value={severity.value}
                        checked={alertData.severity === severity.value}
                        onChange={(e) => setAlertData({...alertData, severity: e.target.value as any})}
                        className="mr-2"
                      />
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        severity.color === 'red' ? 'bg-red-100 text-red-800' :
                        severity.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {severity.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={alertData.description}
                  onChange={(e) => setAlertData({...alertData, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  placeholder="Describe the emergency situation in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Affected Population
                </label>
                <input
                  type="number"
                  value={alertData.affectedPopulation}
                  onChange={(e) => setAlertData({...alertData, affectedPopulation: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  placeholder="Number of people affected"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Deploy Emergency Response Team</h3>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-red-900">Emergency Details</h4>
                    <p className="text-red-800 mt-1">
                      <strong>{alertData.emergencyType}</strong> in <strong>{alertData.village}</strong>
                    </p>
                    <p className="text-red-700 text-sm mt-1">{alertData.description}</p>
                    {alertData.location && (
                      <p className="text-red-700 text-sm">Location: {alertData.location}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Available Teams</h4>
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Medical Response Team</p>
                          <p className="text-sm text-gray-500">2 doctors, 4 nurses</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Available
                        </span>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">ASHA Worker Team</p>
                          <p className="text-sm text-gray-500">6 ASHA workers</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Available
                        </span>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Water Testing Team</p>
                          <p className="text-sm text-gray-500">2 technicians</p>
                        </div>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          On Field
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Deployment Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-gray-700">Teams identified</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-gray-700">Route planned</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">Equipment prepared</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">Teams dispatched</span>
                    </div>
                  </div>

                  <button
                    onClick={handleDeployTeam}
                    disabled={isDeploying}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md font-medium flex items-center justify-center space-x-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>{isDeploying ? 'Deploying Teams...' : 'Deploy Teams'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Send Emergency Alert</h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-2">Alert Recipients</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-yellow-800">• All residents in {alertData.village}</p>
                    <p className="text-yellow-800">• ASHA workers in the area</p>
                    <p className="text-yellow-800">• Local health officials</p>
                  </div>
                  <div>
                    <p className="text-yellow-800">• District health officer</p>
                    <p className="text-yellow-800">• Emergency response teams</p>
                    <p className="text-yellow-800">• Community leaders</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Alert Message Preview</h4>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <p className="font-medium text-red-600">🚨 EMERGENCY ALERT</p>
                  <p className="mt-2 text-gray-900">
                    <strong>{alertData.emergencyType}</strong> reported in <strong>{alertData.village}</strong>
                  </p>
                  {alertData.location && (
                    <p className="text-gray-800">Location: {alertData.location}</p>
                  )}
                  <p className="text-gray-800 mt-1">{alertData.description}</p>
                  <p className="text-gray-700 mt-2 text-sm">
                    Emergency response teams have been deployed. Follow safety protocols and contact local ASHA workers for assistance.
                  </p>
                  <p className="text-gray-600 text-xs mt-2">
                    Sent by: HealthGuard NE Emergency System
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Communication Channels</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">SMS (Primary)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">WhatsApp</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">Push Notifications</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">Local Radio</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSendAlert}
                disabled={isSending}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-md font-medium flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSending ? 'Sending Alert...' : 'Send Emergency Alert'}</span>
              </button>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          <button
            onClick={step === 1 ? onClose : handleBack}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          {step < 3 && (
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && (!alertData.village || !alertData.emergencyType)) ||
                (step === 2 && !isDeploying)
              }
              className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-md font-medium"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlert;