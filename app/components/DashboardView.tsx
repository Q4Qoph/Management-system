// FILE: app/components/DashboardView.tsx
import { Users, Truck, Fuel, Clock, Navigation, Download } from 'lucide-react';
import StatCard from './StatCard';
import ActionButton from './ActionButton';

interface DashboardViewProps {
  presentCount: number;
  trucksEngagedCount: number;
  todayDeliveries: any[];
  todayFuel: any[];
  totalHours: number;
  totalMileage: number;
  deliveries: any[];
  exportToCSV: () => void;
  setCurrentView: (view: string) => void;
  employeesCount: number;
  vehiclesCount: number;
}

export default function DashboardView({ 
  presentCount, 
  trucksEngagedCount, 
  todayDeliveries, 
  todayFuel,
  totalHours,
  totalMileage,
  deliveries,
  exportToCSV,
  setCurrentView,
  employeesCount,
  vehiclesCount
}: DashboardViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Today&apos;s Overview</h2>
        <button onClick={exportToCSV} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={<Users className="w-8 h-8 text-green-600" />} title="Staff Present" value={`${presentCount}/${employeesCount}`} subtitle="Employees" color="green" />
        <StatCard icon={<Truck className="w-8 h-8 text-blue-600" />} title="Trucks Active" value={`${trucksEngagedCount}/${vehiclesCount}`} subtitle="Vehicles" color="blue" />
        <StatCard icon={<Truck className="w-8 h-8 text-purple-600" />} title="Deliveries" value={todayDeliveries.length} subtitle="Trips today" color="purple" />
        <StatCard icon={<Fuel className="w-8 h-8 text-orange-600" />} title="Fuel Used" value={todayFuel.reduce((sum: number, f: any) => sum + parseFloat(f.quantity || 0), 0).toFixed(1)} subtitle="Liters" color="orange" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard icon={<Clock className="w-8 h-8 text-indigo-600" />} title="Total Hours" value={totalHours.toFixed(1)} subtitle="Working hours" color="indigo" />
        <StatCard icon={<Navigation className="w-8 h-8 text-teal-600" />} title="Total Mileage" value={totalMileage.toFixed(1)} subtitle="Kilometers" color="teal" />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ActionButton icon={<Users />} label="Attendance" onClick={() => setCurrentView('attendance')} />
          <ActionButton icon={<Truck />} label="Vehicles" onClick={() => setCurrentView('vehicles')} />
          <ActionButton icon={<Fuel />} label="Fuel" onClick={() => setCurrentView('fuel')} />
          <ActionButton icon={<Truck />} label="Deliveries" onClick={() => setCurrentView('deliveries')} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Deliveries</h3>
        <div className="space-y-2">
          {deliveries.slice(0, 5).map((delivery: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800">{delivery.vehicle} → {delivery.destination}</p>
                  <p className="text-sm text-gray-600">{delivery.material} | {delivery.quantity} tonnes</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{delivery.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}