// FILE: hooks/useVehicles.ts
import { useState, useEffect } from 'react';
import { getVehicles } from '@/lib/api';

export function useVehicles() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getVehicles();
        setVehicles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch vehicles');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { vehicles, loading, error };
}
