import { useState, useEffect, useCallback } from 'react';

export interface DeviceData {
  handDistance: number;
  pillDetected: boolean;
  motorRunning: boolean;
  deviceState: 'WAIT_FOR_HAND' | 'MOTOR_RUNNING' | 'MOTOR_STOPPED';
  lastDispensed: string | null;
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
  batteryLevel?: number;
  temperature?: number;
}

export interface DispensingEvent {
  id: string;
  timestamp: string;
  medicineId: string;
  success: boolean;
  handDistance: number;
}

export const useDeviceConnection = () => {
  const [deviceData, setDeviceData] = useState<DeviceData>({
    handDistance: -1,
    pillDetected: false,
    motorRunning: false,
    deviceState: 'WAIT_FOR_HAND',
    lastDispensed: null,
    connectionStatus: 'disconnected'
  });

  const [dispensingHistory, setDispensingHistory] = useState<DispensingEvent[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);

  // Simulate WebSocket connection to ESP32 device
  const connectToDevice = useCallback(async (deviceIP: string) => {
    setIsConnecting(true);
    setDeviceData(prev => ({ ...prev, connectionStatus: 'connecting' }));

    try {
      // In a real implementation, this would connect to your ESP32 via WebSocket
      // For demo purposes, we'll simulate the connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setDeviceData(prev => ({ ...prev, connectionStatus: 'connected' }));
      
      // Start receiving simulated data
      startDataSimulation();
      
      console.log(`Connected to ESP32 device at ${deviceIP}`);
    } catch (error) {
      console.error('Failed to connect to device:', error);
      setDeviceData(prev => ({ ...prev, connectionStatus: 'disconnected' }));
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // Simulate real-time data from ESP32
  const startDataSimulation = useCallback(() => {
    const interval = setInterval(() => {
      // Simulate device data updates
      setDeviceData(prev => {
        const newData = { ...prev };
        
        // Simulate hand detection
        if (Math.random() < 0.1) { // 10% chance of hand detection
          newData.handDistance = Math.random() * 10 + 5; // 5-15 cm
          newData.deviceState = 'MOTOR_RUNNING';
          newData.motorRunning = true;
          
          // Simulate pill dispensing after motor runs
          setTimeout(() => {
            setDeviceData(current => ({
              ...current,
              pillDetected: true,
              motorRunning: false,
              deviceState: 'MOTOR_STOPPED',
              lastDispensed: new Date().toISOString()
            }));
            
            // Add to dispensing history
            const event: DispensingEvent = {
              id: Date.now().toString(),
              timestamp: new Date().toISOString(),
              medicineId: 'current-medicine',
              success: true,
              handDistance: newData.handDistance
            };
            
            setDispensingHistory(prev => [event, ...prev.slice(0, 9)]); // Keep last 10 events
            
            // Reset after 5 seconds
            setTimeout(() => {
              setDeviceData(reset => ({
                ...reset,
                pillDetected: false,
                deviceState: 'WAIT_FOR_HAND',
                handDistance: -1
              }));
            }, 5000);
          }, 3000);
        } else {
          newData.handDistance = -1;
          if (newData.deviceState === 'WAIT_FOR_HAND') {
            newData.motorRunning = false;
          }
        }
        
        // Simulate battery and temperature
        newData.batteryLevel = 85 + Math.random() * 10; // 85-95%
        newData.temperature = 22 + Math.random() * 3; // 22-25°C
        
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const disconnectDevice = useCallback(() => {
    setDeviceData(prev => ({ 
      ...prev, 
      connectionStatus: 'disconnected',
      handDistance: -1,
      pillDetected: false,
      motorRunning: false,
      deviceState: 'WAIT_FOR_HAND'
    }));
  }, []);

  const triggerManualDispense = useCallback(async () => {
    if (deviceData.connectionStatus !== 'connected') return false;
    
    try {
      // In real implementation, send command to ESP32
      console.log('Triggering manual dispense...');
      
      setDeviceData(prev => ({
        ...prev,
        motorRunning: true,
        deviceState: 'MOTOR_RUNNING'
      }));
      
      return true;
    } catch (error) {
      console.error('Failed to trigger manual dispense:', error);
      return false;
    }
  }, [deviceData.connectionStatus]);

  return {
    deviceData,
    dispensingHistory,
    isConnecting,
    connectToDevice,
    disconnectDevice,
    triggerManualDispense
  };
};