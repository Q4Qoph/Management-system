// FILE: app/components/ExcavatorsView.tsx (UPDATED)
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface ExcavatorsViewProps {
  excavatorLogs: any[];
  excavators: string[];
  onAddExcavatorLog: (data: any) => Promise<void>;
  currentDate: string;
}

export default function ExcavatorsView({
  excavatorLogs,
  excavators,
  onAddExcavatorLog,
  currentDate
}: ExcavatorsViewProps) {
  const LOCATIONS = ['Likoni', 'Mwache', 'Quarry', 'Rabai', 'Other'];

  const [newExcavatorLog, setNewExcavatorLog] = useState({
    date: currentDate,
    excavator: excavators[0] || 'Excavator 1',
    location: '',
    bucketHrs: '',
    breakerHrs: '',
    totalHrs: '',
    meterReading: '',
    fuel: '',
    hydraulicOil: ''
  });

  const handleSubmit = async () => {
    if (!newExcavatorLog.location || !newExcavatorLog.totalHrs) {
      alert('⚠️ Please fill required fields (location, total hours)');
      return;
    }
    await onAddExcavatorLog(newExcavatorLog);
    setNewExcavatorLog({
      date: currentDate,
      excavator: excavators[0] || 'Excavator 1',
      location: '',
      bucketHrs: '',
      breakerHrs: '',
      totalHrs: '',
      meterReading: '',
      fuel: '',
      hydraulicOil: ''
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Excavator Operations</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Log Excavator Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={newExcavatorLog.date}
              onChange={(e) => setNewExcavatorLog({...newExcavatorLog, date: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Excavator</label>
            <select
              value={newExcavatorLog.excavator}
              onChange={(e) => setNewExcavatorLog({...newExcavatorLog, excavator: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {excavators.map(ex => <option key={ex} value={ex}>{ex}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
            <select
              value={newExcavatorLog.location}
              onChange={(e) => setNewExcavatorLog({...newExcavatorLog, location: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Location</option>
              {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bucket Hours</label>
            <input
              type="number"
              step="1"
              value={newExcavatorLog.bucketHrs}
              onChange={(e) => setNewExcavatorLog({...newExcavatorLog, bucketHrs: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Breaker Hours</label>
            <input
              type="number"
              step="0.5"
              value={newExcavatorLog.breakerHrs}
              onChange={(e) => setNewExcavatorLog({...newExcavatorLog, breakerHrs: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Hours *</label>
            <input
              type="number"
              step="0.5"
              value={newExcavatorLog.totalHrs}
              onChange={(e) => setNewExcavatorLog({...newExcavatorLog, totalHrs: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meter Reading</label>
            <input
              type="number"
              step="0.5"
              value={newExcavatorLog.meterReading}
              onChange={(e) => setNewExcavatorLog({...newExcavatorLog, meterReading: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Used (L)</label>
            <input
              type="number"
              step="0.5"
              value={newExcavatorLog.fuel}
              onChange={(e) => setNewExcavatorLog({...newExcavatorLog, fuel: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hydraulic Oil (L)</label>
            <input
              type="number"
              step="0.5"
              value={newExcavatorLog.hydraulicOil}
              onChange={(e) => setNewExcavatorLog({...newExcavatorLog, hydraulicOil: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.0"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Excavator Log
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Excavator Logs ({excavatorLogs.length})</h3>
        {excavatorLogs.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No excavator logs recorded yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Excavator</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Bucket Hrs</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Breaker Hrs</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Total Hrs</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Fuel (L)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {excavatorLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800">{new Date(log.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{log.excavator?.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{log.location}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-800">{log.bucketHrs || '-'}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-800">{log.breakerHrs || '-'}</td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{log.totalHrs}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-800">{log.fuelUsed || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
