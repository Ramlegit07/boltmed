import React, { useState } from 'react';
import { Wifi, WifiOff, Battery, Thermometer, Hand, Pill, RotateCcw, Play, Settings } from 'lucide-react';
import { useDeviceConnection } from '../hooks/useDeviceConnection';

const DeviceStatus: React.FC = () => {
  const { 
    deviceData, 
    dispensingHistory, 
    isConnecting, 
    connectToDevice, 
    disconnectDevice, 
    triggerManualDispense 
  } = useDeviceConnection();
  
  const [deviceIP, setDeviceIP] = useState('192.168.1.100');
  const [showConnectionModal, setShowConnectionModal] = useState(false);

  const getStateColor = (state: string) => {
    switch (state) {
      case 'WAIT_FOR_HAND': return 'text-blue-600 bg-blue-100';
      case 'MOTOR_RUNNING': return 'text-orange-600 bg-orange-100';
      case 'MOTOR_STOPPED': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="space-y-6">
      {/* Connection Status Card */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Device Connection</h3>
          <div className="flex items-center space-x-2">
            {deviceData.connectionStatus === 'connected' ? (
              <Wifi className="h-5 w-5 text-green-600" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-600" />
            )}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              deviceData.connectionStatus === 'connected' 
                ? 'bg-green-100 text-green-700'
                : deviceData.connectionStatus === 'connecting'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {deviceData.connectionStatus === 'connecting' ? 'Connecting...' : 
               deviceData.connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        <div className="flex space-x-3">
          {deviceData.connectionStatus === 'disconnected' ? (
            <button
              onClick={() => setShowConnectionModal(true)}
              disabled={isConnecting}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:shadow-md transition-all duration-200 disabled:opacity-50"
            >
              {isConnecting ? 'Connecting...' : 'Connect Device'}
            </button>
          ) : (
            <button
              onClick={disconnectDevice}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Disconnect
            </button>
          )}
          
          <button
            onClick={() => setShowConnectionModal(true)}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Settings className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Device Status Grid */}
      {deviceData.connectionStatus === 'connected' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Device State */}
          <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getStateColor(deviceData.deviceState)}`}>
                <RotateCcw className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Device State</p>
                <p className="font-bold text-gray-900">{deviceData.deviceState.replace(/_/g, ' ')}</p>
              </div>
            </div>
          </div>

          {/* Hand Detection */}
          <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                deviceData.handDistance > 0 && deviceData.handDistance < 15 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <Hand className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Hand Distance</p>
                <p className="font-bold text-gray-900">
                  {deviceData.handDistance > 0 ? `${deviceData.handDistance.toFixed(1)} cm` : 'No hand'}
                </p>
              </div>
            </div>
          </div>

          {/* Pill Detection */}
          <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                deviceData.pillDetected 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <Pill className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pill Status</p>
                <p className="font-bold text-gray-900">
                  {deviceData.pillDetected ? 'Detected' : 'Not detected'}
                </p>
              </div>
            </div>
          </div>

          {/* Motor Status */}
          <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                deviceData.motorRunning 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <RotateCcw className={`h-5 w-5 ${deviceData.motorRunning ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Motor</p>
                <p className="font-bold text-gray-900">
                  {deviceData.motorRunning ? 'Running' : 'Stopped'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Info */}
      {deviceData.connectionStatus === 'connected' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 p-4">
            <div className="flex items-center space-x-3">
              <Battery className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Battery Level</p>
                <p className="font-bold text-gray-900">{deviceData.batteryLevel?.toFixed(0)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 p-4">
            <div className="flex items-center space-x-3">
              <Thermometer className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="font-bold text-gray-900">{deviceData.temperature?.toFixed(1)}°C</p>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 p-4">
            <button
              onClick={triggerManualDispense}
              disabled={deviceData.motorRunning}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:shadow-md transition-all duration-200 disabled:opacity-50"
            >
              <Play className="h-4 w-4" />
              <span>Manual Dispense</span>
            </button>
          </div>
        </div>
      )}

      {/* Dispensing History */}
      {deviceData.connectionStatus === 'connected' && dispensingHistory.length > 0 && (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Dispensing Events</h3>
          <div className="space-y-3">
            {dispensingHistory.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    event.success ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    <Pill className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {event.success ? 'Dose dispensed successfully' : 'Dispensing failed'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Hand distance: {event.handDistance.toFixed(1)} cm
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {formatTimestamp(event.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connection Modal */}
      {showConnectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect to Device</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device IP Address
                </label>
                <input
                  type="text"
                  value={deviceIP}
                  onChange={(e) => setDeviceIP(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="192.168.1.100"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowConnectionModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    connectToDevice(deviceIP);
                    setShowConnectionModal(false);
                  }}
                  disabled={isConnecting}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                  {isConnecting ? 'Connecting...' : 'Connect'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceStatus;