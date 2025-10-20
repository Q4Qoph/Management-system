// FILE: hooks/useDrivers.ts
import { useState, useEffect } from 'react';
import { getDrivers } from '@/lib/api';

export function useDrivers() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getDrivers();
        setDrivers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch drivers');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { drivers, loading, error };
}