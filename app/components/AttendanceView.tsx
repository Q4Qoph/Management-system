// FILE: app/components/AttendanceView.tsx
'use client';

import { Users, CheckCircle, XCircle, Save } from 'lucide-react';

interface AttendanceViewProps {
  attendance: Record<string, boolean>;
  driverAttendance: Record<string, boolean>;
  employees: string[];
  drivers: string[];
  toggleAttendance: (employee: string) => void;
  toggleDriverAttendance: (driver: string) => void;
  markAllPresent: () => void;
  saveAttendance: () => void;
  saveDriverAttendance: () => void;
}

export default function AttendanceView({
  attendance,
  driverAttendance,
  employees,
  drivers,
  toggleAttendance,
  toggleDriverAttendance,
  markAllPresent,
  saveAttendance,
  saveDriverAttendance
}: AttendanceViewProps) {
  const presentCount = Object.values(attendance).filter(Boolean).length;
  const driversPresent = Object.values(driverAttendance).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Daily Attendance</h2>
        <div className="flex gap-2">
          <button onClick={markAllPresent} className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-sm font-medium">
            Mark All Present
          </button>
          <button onClick={saveAttendance} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>

      {/* Employee Attendance */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Employee Attendance</h3>
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">{presentCount}</span> of <span className="font-semibold">{employees.length}</span> employees marked present
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {employees.map(employee => (
            <div key={employee} onClick={() => toggleAttendance(employee)} className={`p-4 rounded-lg border-2 cursor-pointer transition ${attendance[employee] ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-300 hover:border-gray-400'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {attendance[employee] ? <CheckCircle className="w-6 h-6 text-green-600" /> : <XCircle className="w-6 h-6 text-gray-400" />}
                  <span className="font-medium text-gray-800">{employee}</span>
                </div>
                <span className={`text-sm font-semibold ${attendance[employee] ? 'text-green-600' : 'text-gray-400'}`}>
                  {attendance[employee] ? 'Present' : 'Absent'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Driver Attendance (KPA) */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Driver Attendance (KPA)</h3>
          <button onClick={saveDriverAttendance} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
            Save
          </button>
        </div>
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">{driversPresent}</span> of <span className="font-semibold">{drivers.length}</span> drivers present
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {drivers.map(driver => (
            <div key={driver} onClick={() => toggleDriverAttendance(driver)} className={`p-4 rounded-lg border-2 cursor-pointer transition ${driverAttendance[driver] ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-300 hover:border-gray-400'}`}>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800">{driver}</span>
                {driverAttendance[driver] ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-gray-400" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}