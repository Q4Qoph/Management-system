// FILE: app/components/QuarryView.tsx (UPDATED)
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface QuarryViewProps {
  quarryProduction: any[];
  onAddQuarryProduction: (data: any) => Promise<void>;
  currentDate: string;
}

export default function QuarryView({
  quarryProduction,
  onAddQuarryProduction,
  currentDate
}: QuarryViewProps) {
  const MATERIALS = ['Limestone Blasted', 'Hardcore', 'Soil', 'Boulders', 'Ballast'];

  const [newQuarryProd, setNewQuarryProd] = useState({
    date: currentDate,
    shift: 'day',
    product: 'Boulders',
    trucks: '',
    tonnes: ''
  });

  const handleSubmit = async () => {
    if (!newQuarryProd.product || !newQuarryProd.trucks || !newQuarryProd.tonnes) {
      alert('⚠️ Please fill all required fields');
      return;
    }
    await onAddQuarryProduction(newQuarryProd);
    setNewQuarryProd({ date: currentDate, shift: 'day', product: 'Boulders', trucks: '', tonnes: '' });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Quarry Production</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Log Mining Tally</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={newQuarryProd.date}
              onChange={(e) => setNewQuarryProd({...newQuarryProd, date: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Shift</label>
            <select
              value={newQuarryProd.shift}
              onChange={(e) => setNewQuarryProd({...newQuarryProd, shift: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="day">Day Shift</option>
              <option value="night">Night Shift</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product *</label>
            <select
              value={newQuarryProd.product}
              onChange={(e) => setNewQuarryProd({...newQuarryProd, product: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Trucks *</label>
            <input
              type="number"
              value={newQuarryProd.trucks}
              onChange={(e) => setNewQuarryProd({...newQuarryProd, trucks: e.target.value})}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (Tonnes) *</label>
            <input
              type="number"
              step="0.01"
              value={newQuarryProd.tonnes}
              onChange={(e) => setNewQuarryProd({...newQuarryProd, tonnes: e.target.value})}
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
          Add Production Record
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Production Records ({quarryProduction.length})</h3>
        {quarryProduction.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No production records yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Shift</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Trucks</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Tonnes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {quarryProduction.map((prod, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800">{new Date(prod.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <span className={`px-2 py-1 rounded-full text-xs ${prod.shift === 'day' ? 'bg-yellow-100 text-yellow-700' : 'bg-indigo-100 text-indigo-700'}`}>
                        {prod.shift === 'day' ? 'Day' : 'Night'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{prod.product}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-800">{prod.trucks}</td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{parseFloat(prod.tonnes).toFixed(2)}</td>
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