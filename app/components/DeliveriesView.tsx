// FILE: app/components/DeliveriesView.tsx (UPDATED)
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface DeliveriesViewProps {
  deliveries: any[];
  vehicles: string[];
  onAddDelivery: (data: any) => Promise<void>;
  currentDate: string;
}

export default function DeliveriesView({
  deliveries,
  vehicles,
  onAddDelivery,
  currentDate
}: DeliveriesViewProps) {
  const DESTINATIONS = ['Mombasa Cement', 'Belion', 'Rabai', 'Airport', 'Hindu Cemetery', 'Other'];
  const MATERIALS = ['Limestone Blasted', 'Hardcore', 'Soil', 'Boulders', 'Ballast'];

  const [newDelivery, setNewDelivery] = useState({
    date: currentDate,
    vehicle: '',
    destination: '',
    material: '',
    wbTicket: '',
    dNote: '',
    quantity: ''
  });

  const handleSubmit = async () => {
    if (!newDelivery.vehicle || !newDelivery.destination || !newDelivery.quantity) {
      alert('⚠️ Please fill all required fields');
      return;
    }
    await onAddDelivery(newDelivery);
    setNewDelivery({ date: currentDate, vehicle: '', destination: '', material: '', wbTicket: '', dNote: '', quantity: '' });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Delivery Management</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Record Delivery</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={newDelivery.date}
              onChange={(e) => setNewDelivery({...newDelivery, date: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Reg *</label>
            <select
              value={newDelivery.vehicle}
              onChange={(e) => setNewDelivery({...newDelivery, vehicle: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Vehicle</option>
              {vehicles.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination *</label>
            <select
              value={newDelivery.destination}
              onChange={(e) => setNewDelivery({...newDelivery, destination: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Destination</option>
              {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
            <select
              value={newDelivery.material}
              onChange={(e) => setNewDelivery({...newDelivery, material: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Material</option>
              {MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">W/Bridge Ticket No</label>
            <input
              type="text"
              value={newDelivery.wbTicket}
              onChange={(e) => setNewDelivery({...newDelivery, wbTicket: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter ticket number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">D/Note No</label>
            <input
              type="text"
              value={newDelivery.dNote}
              onChange={(e) => setNewDelivery({...newDelivery, dNote: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter delivery note"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (Tonnes) *</label>
            <input
              type="number"
              step="1"
              value={newDelivery.quantity}
              onChange={(e) => setNewDelivery({...newDelivery, quantity: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Save Delivery
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Deliveries ({deliveries.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Vehicle</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Destination</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Material</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">WB Ticket</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Qty (T)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {deliveries.map((delivery, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-800">{new Date(delivery.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{delivery.vehicle?.registrationNo}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{delivery.destination}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{delivery.material}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{delivery.wbTicket}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{parseFloat(delivery.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}