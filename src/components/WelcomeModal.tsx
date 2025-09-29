import React, { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContexts';

const WelcomeModal = () => {
  const { user } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (user) {
      const hasSeenWelcome = localStorage.getItem(`welcome_${user.id}`);
      if (!hasSeenWelcome) {
        setShowWelcome(true);
        localStorage.setItem(`welcome_${user.id}`, 'true');
      }
    }
  }, [user]);

  if (!showWelcome || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Welcome Back!</h3>
              <p className="text-sm text-gray-500">You're successfully logged in</p>
            </div>
          </div>
          <button
            onClick={() => setShowWelcome(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user.avatar}
            </div>
            <div>
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              Welcome to HealthGuard NE! You now have access to the health monitoring dashboard 
              and all system features based on your role permissions.
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setShowWelcome(false)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
          >
            Get Started
          </button>
          <button
            onClick={() => setShowWelcome(false)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium"
          >
            Take Tour
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;