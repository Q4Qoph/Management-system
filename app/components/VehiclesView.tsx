// FILE: app/components/VehiclesView.tsx
import { CheckCircle, XCircle, Save } from 'lucide-react';

interface VehiclesViewProps {
  vehicles: string[];
  trucksEngaged: Record<string, boolean>;
  vehicleHours: Record<string, string>;
  toggleTruckEngaged: (vehicle: string) => void;
  setVehicleHours: (hours: Record<string, string>) => void;
  markAllTrucksEngaged: () => void;
  saveVehicleData: () => void;
}

export default function VehiclesView({
  vehicles,
  trucksEngaged,
  vehicleHours,
  toggleTruckEngaged,
  setVehicleHours,
  markAllTrucksEngaged,
  saveVehicleData
}: VehiclesViewProps) {
  const trucksEngagedCount = Object.values(trucksEngaged).filter(Boolean).length;
  const totalHours = Object.values(vehicleHours).reduce((sum, h) => sum + (parseFloat(h) || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Vehicle Operations</h2>
        <div className="flex gap-2">
          <button onClick={markAllTrucksEngaged} className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-sm font-medium">
            Mark All Engaged
          </button>
          <button onClick={saveVehicleData} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save All
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Trucks Engaged & Working Hours</h3>
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">{trucksEngagedCount}</span> trucks engaged | Total hours: <span className="font-semibold">{totalHours.toFixed(1)}</span>
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Vehicle</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Engaged</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Working Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vehicles.map(vehicle => (
                <tr key={vehicle} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{vehicle}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleTruckEngaged(vehicle)} className={`p-2 rounded ${trucksEngaged[vehicle] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                      {trucksEngaged[vehicle] ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.5"
                      value={vehicleHours[vehicle]}
                      onChange={(e) => setVehicleHours({...vehicleHours, [vehicle]: e.target.value})}
                      className="text-gray-900 w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                    <span className="ml-2 text-sm text-gray-600">hrs</span>
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