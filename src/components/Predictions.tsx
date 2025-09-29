import React, { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, Brain, RefreshCw } from 'lucide-react';

const Predictions = () => {
  const [isRetraining, setIsRetraining] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [modelAccuracy, setModelAccuracy] = useState(87.3);

  useEffect(() => {
    // Simulate model accuracy fluctuation
    const interval = setInterval(() => {
      setModelAccuracy(prev => Math.max(80, Math.min(95, prev + (Math.random() - 0.5) * 2)));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const predictions = [
    {
      id: 'pred-001',
      type: 'High Risk Alert',
      disease: 'Cholera outbreak predicted in Dibrugarh district',
      timeframe: 'Next 7 Days',
      probability: '78%',
      riskScore: '8.2/10',
      affectedArea: '15 km²',
      population: '~12,000',
      severity: 'high',
      actions: ['Deploy Prevention', 'View Details'],
      confidence: 0.78
    },
    {
      id: 'pred-002',
      type: 'Medium Risk Alert',
      disease: 'Typhoid cases may increase in Tezpur area',
      timeframe: 'Next 14 Days',
      probability: '45%',
      riskScore: '5.8/10',
      affectedArea: '',
      population: '',
      severity: 'medium',
      actions: ['View Details'],
      confidence: 0.45
    },
    {
      id: 'pred-003',
      type: 'Low Risk',
      disease: 'Guwahati region shows stable health indicators',
      timeframe: 'Next 30 Days',
      probability: '',
      riskScore: '',
      affectedArea: '',
      population: '',
      severity: 'low',
      actions: [],
      confidence: 0.92
    }
  ];

  const modelPerformance = [
    { metric: 'Accuracy Rate', value: `${modelAccuracy.toFixed(1)}%`, color: 'green' },
    { metric: 'Early Detection Rate', value: '92.1%', color: 'blue' },
    { metric: 'False Positive Rate', value: '8.7%', color: 'orange' }
  ];

  const modelFactors = [
    { factor: 'Weather Patterns', weight: '25%' },
    { factor: 'Water Quality', weight: '35%' },
    { factor: 'Case History', weight: '20%' },
    { factor: 'Population Density', weight: '20%' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200';
      case 'medium':
        return 'bg-orange-50 border-orange-200';
      case 'low':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getTimeframeColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRetrain = async () => {
    setIsRetraining(true);
    // Simulate model retraining
    await new Promise(resolve => setTimeout(resolve, 5000));
    setModelAccuracy(prev => Math.min(95, prev + Math.random() * 5));
    setLastUpdated(new Date());
    setIsRetraining(false);
  };

  const handleDeployPrevention = (predictionId: string) => {
    alert(`Prevention measures deployed for prediction ${predictionId}. Emergency response teams have been notified.`);
  };

  const handleViewDetails = (predictionId: string) => {
    alert(`Detailed analysis for prediction ${predictionId} would open in a new window.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">AI Outbreak Predictions</h2>
          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
            isRetraining ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
          }`}>
            {isRetraining ? 'Retraining...' : 'Model Active'}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Predictions */}
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className={`p-6 rounded-lg border-2 ${getSeverityColor(prediction.severity)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{prediction.type}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTimeframeColor(prediction.severity)}`}>
                      {prediction.timeframe}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{prediction.disease}</p>
                  
                  {prediction.probability && (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Probability: </span>
                        <span className="font-medium">{prediction.probability}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Risk Score: </span>
                        <span className="font-medium">{prediction.riskScore}</span>
                      </div>
                      {prediction.affectedArea && (
                        <div>
                          <span className="text-gray-600">Affected Area: </span>
                          <span className="font-medium">{prediction.affectedArea}</span>
                        </div>
                      )}
                      {prediction.population && (
                        <div>
                          <span className="text-gray-600">Population: </span>
                          <span className="font-medium">{prediction.population}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {prediction.actions.length > 0 && (
                <div className="flex items-center space-x-2 pt-3 border-t border-gray-200">
                  {prediction.actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      onClick={() => {
                        if (action === 'Deploy Prevention') {
                          handleDeployPrevention(prediction.id);
                        } else if (action === 'View Details') {
                          handleViewDetails(prediction.id);
                        }
                      }}
                      className={`px-3 py-1 text-xs font-medium rounded-md ${
                        action === 'Deploy Prevention'
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Confidence indicator */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Model Confidence</span>
                  <span>{(prediction.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                  <div 
                    className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${prediction.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Model Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Prediction Model Performance</h3>
            <button 
              onClick={handleRetrain}
              disabled={isRetraining}
              className="text-blue-600 hover:text-blue-800 disabled:text-blue-400 text-sm font-medium flex items-center space-x-1"
            >
              <RefreshCw className={`w-4 h-4 ${isRetraining ? 'animate-spin' : ''}`} />
              <span>{isRetraining ? 'Retraining...' : 'Retrain Model'}</span>
            </button>
          </div>
          
          <div className="space-y-6">
            {modelPerformance.map((metric, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{metric.metric}</span>
                  <span className="text-sm font-bold text-gray-900">{metric.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      metric.color === 'green' ? 'bg-green-500' :
                      metric.color === 'blue' ? 'bg-blue-500' : 'bg-orange-500'
                    }`}
                    style={{ 
                      width: metric.color === 'orange' ? '8.7%' : 
                            metric.color === 'green' ? '87.3%' : '92.1%'
                    }}
                  ></div>
                </div>
              </div>
            ))}

            <div className="pt-6 border-t border-gray-200">
              <h4 className="text-md font-medium text-gray-900 mb-4">Model Factors</h4>
              <div className="space-y-3">
                {modelFactors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{factor.factor}</span>
                    <span className="text-sm font-medium text-gray-900">{factor.weight}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={handleRetrain}
              disabled={isRetraining}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md font-medium mt-6 flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRetraining ? 'animate-spin' : ''}`} />
              <span>{isRetraining ? 'Retraining Model...' : 'Retrain Model'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictions;