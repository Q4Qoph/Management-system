// FILE: hooks/useAttendance.ts
import { useState, useEffect } from 'react';
import { getAttendance, getEmployees, saveAttendance } from '@/lib/api';

export function useAttendance(date: string) {
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [employeesData, attendanceData] = await Promise.all([
          getEmployees(),
          getAttendance(date),
        ]);

        setEmployees(employeesData);

        // Build attendance map
        const attendanceMap: Record<string, boolean> = {};
        employeesData.forEach((emp: any) => {
          const record = attendanceData.find((a: any) => a.employeeId === emp.id);
          attendanceMap[emp.id] = record?.present || false;
        });
        setAttendance(attendanceMap);
      } catch (err) {
        console.error('Error fetching attendance:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [date]);

  const toggleAttendance = (employeeId: string) => {
    setAttendance(prev => ({ ...prev, [employeeId]: !prev[employeeId] }));
  };

  const saveAll = async () => {
    try {
      setSaving(true);
      const promises = Object.entries(attendance).map(([employeeId, present]) =>
        saveAttendance({ date, employeeId, present })
      );
      await Promise.all(promises);
      alert('✅ Attendance saved successfully!');
    } catch (err) {
      console.error('Error saving attendance:', err);
      alert('❌ Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  return {
    attendance,
    employees,
    loading,
    saving,
    toggleAttendance,
    saveAll,
  };
}