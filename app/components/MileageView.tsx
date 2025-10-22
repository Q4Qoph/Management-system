// FILE: app/components/MileageView.tsx
import { Save } from 'lucide-react';

interface MileageViewProps {
  vehicles: string[];
  mileage: Record<string, string>;
  setMileage: (mileage: Record<string, string>) => void;
  saveMileage: () => void;
}

export default function MileageView({
  vehicles,
  mileage,
  setMileage,
  saveMileage
}: MileageViewProps) {
  const totalMileage = Object.values(mileage).reduce((sum, m) => sum + (parseFloat(m) || 0), 0);
  const avgMileage = totalMileage / (Object.values(mileage).filter(m => m && parseFloat(m) > 0).length || 1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Mileage Tracking</h2>
        <button onClick={saveMileage} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Mileage
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Daily Mileage by Vehicle</h3>
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            Total mileage: <span className="font-semibold">{totalMileage.toFixed(1)} km</span> | Average: <span className="font-semibold">{avgMileage.toFixed(1)} km</span>
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Vehicle</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Mileage (km)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vehicles.map(vehicle => (
                <tr key={vehicle} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{vehicle}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="1.0"
                      value={mileage[vehicle]}
                      onChange={(e) => setMileage({...mileage, [vehicle]: e.target.value})}
                      className="text-gray-900 w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.0"
                    />
                  </td>
                  <td className="px-4 py-3">
                    {mileage[vehicle] && parseFloat(mileage[vehicle]) > 0 ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Logged</span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
