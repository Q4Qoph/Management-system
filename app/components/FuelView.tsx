// FILE: app/components/FuelView.tsx (UPDATED)
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface FuelViewProps {
  fuelEntries: any[];
  vehicles: string[];
  excavators: string[];
  onAddFuelEntry: (data: any) => Promise<void>;
  currentDate: string;
}

export default function FuelView({
  fuelEntries,
  vehicles,
  excavators,
  onAddFuelEntry,
  currentDate
}: FuelViewProps) {
  const FUEL_PRODUCTS = ['Diesel', 'Petrol', 'Hispin 68', 'Engine Oil'];
  
  const [newFuel, setNewFuel] = useState({
    date: currentDate,
    vehicle: '',
    product: 'Diesel',
    quantity: '',
    amount: ''
  });

  const handleSubmit = async () => {
    if (!newFuel.vehicle || !newFuel.quantity || !newFuel.amount) {
      alert('⚠️ Please fill all required fields');
      return;
    }
    await onAddFuelEntry(newFuel);
    setNewFuel({ date: currentDate, vehicle: '', product: 'Diesel', quantity: '', amount: '' });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Fuel Tracking</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Add Fuel Transaction</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={newFuel.date}
              onChange={(e) => setNewFuel({...newFuel, date: e.target.value})}
              className="text-gray-950 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle *</label>
            <select
              value={newFuel.vehicle}
              onChange={(e) => setNewFuel({...newFuel, vehicle: e.target.value})}
              className="text-gray-950 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Vehicle</option>
              {vehicles.map(v => <option key={v} value={v}>{v}</option>)}
              {excavators.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
            <select
              value={newFuel.product}
              onChange={(e) => setNewFuel({...newFuel, product: e.target.value})}
              className=" text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {FUEL_PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (Liters) *</label>
            <input
              type="number"
              step="1"
              value={newFuel.quantity}
              onChange={(e) => setNewFuel({...newFuel, quantity: e.target.value})}
              className="text-gray-950 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount (KES) *</label>
            <input
              type="number"
              step="1"
              value={newFuel.amount}
              onChange={(e) => setNewFuel({...newFuel, amount: e.target.value})}
              className="text-gray-950 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Fuel Entry
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Fuel Entries ({fuelEntries.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Vehicle</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Quantity (L)</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Amount (KES)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fuelEntries.map((entry, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-800">{new Date(entry.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{entry.vehicle?.registrationNo || entry.vehicle?.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{entry.product}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-800">{parseFloat(entry.quantity).toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{parseFloat(entry.amount).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}