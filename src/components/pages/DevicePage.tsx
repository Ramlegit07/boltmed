import React from 'react';
import { Cpu, Wifi } from 'lucide-react';
import DeviceStatus from '../DeviceStatus';

const DevicePage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
            <Cpu className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              ESP32 Medicine Dispenser
            </h1>
            <p className="text-gray-600">Real-time device monitoring and control</p>
          </div>
        </div>
      </div>

      <DeviceStatus />

      {/* Device Information */}
      <div className="mt-8 bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Device Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Hardware Components</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <strong>Microcontroller:</strong> ESP32</li>
              <li>• <strong>Motor Driver:</strong> L293 IC</li>
              <li>• <strong>Hand Detection:</strong> Ultrasonic Sensor (HC-SR04)</li>
              <li>• <strong>Pill Detection:</strong> IR Sensor</li>
              <li>• <strong>Status LED:</strong> Red LED (Pin 14)</li>
              <li>• <strong>Motor Control:</strong> DC Motor with encoder</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Pin Configuration</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <strong>LED Pin:</strong> GPIO 14</li>
              <li>• <strong>IR Sensor:</strong> GPIO 2</li>
              <li>• <strong>Motor IN1:</strong> GPIO 18</li>
              <li>• <strong>Motor IN2:</strong> GPIO 19</li>
              <li>• <strong>Motor EN1:</strong> GPIO 16</li>
              <li>• <strong>Ultrasonic Trig:</strong> GPIO 21</li>
              <li>• <strong>Ultrasonic Echo:</strong> GPIO 22</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Operating Instructions */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-200/50 p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              1
            </div>
            <h4 className="font-semibold text-blue-900 mb-2">Hand Detection</h4>
            <p className="text-sm text-blue-700">
              Place your hand within 15cm of the ultrasonic sensor to trigger dispensing
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              2
            </div>
            <h4 className="font-semibold text-blue-900 mb-2">Motor Activation</h4>
            <p className="text-sm text-blue-700">
              Motor runs forward to dispense medicine until pill is detected by IR sensor
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              3
            </div>
            <h4 className="font-semibold text-blue-900 mb-2">Completion</h4>
            <p className="text-sm text-blue-700">
              System stops motor and waits 5 seconds before being ready for next dose
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicePage;