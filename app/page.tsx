// FILE: app/page.tsx (UPDATED WITH BACKEND CONNECTION)
'use client';

import { useState, useEffect } from 'react';
import { Truck, Home, Users, Navigation, Fuel, Drill, Mountain, ChevronLeft, ChevronRight } from 'lucide-react';
import DashboardView from './components/DashboardView';
import AttendanceView from './components/AttendanceView';
import VehiclesView from './components/VehiclesView';
import MileageView from './components/MileageView';
import FuelView from './components/FuelView';
import DeliveriesView from './components/DeliveriesView';
import ExcavatorsView from './components/ExcavatorsView';
import QuarryView from './components/QuarryView';
import NavButton from './components/NavButton';
import * as api from '@/lib/api';

export default function FleetManagementPage() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);

  // Master data from database
  const [employees, setEmployees] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [excavators, setExcavators] = useState<any[]>([]);

  // Daily data
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [driverAttendance, setDriverAttendance] = useState<Record<string, boolean>>({});
  const [trucksEngaged, setTrucksEngaged] = useState<Record<string, boolean>>({});
  const [vehicleHours, setVehicleHours] = useState<Record<string, string>>({});
  const [mileage, setMileage] = useState<Record<string, string>>({});
  
  const [fuelEntries, setFuelEntries] = useState<any[]>([]);
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [excavatorLogs, setExcavatorLogs] = useState<any[]>([]);
  const [quarryProduction, setQuarryProduction] = useState<any[]>([]);

  // Load master data on mount
  useEffect(() => {
    async function loadMasterData() {
      try {
        setLoading(true);
        const [employeesData, driversData, vehiclesData, excavatorsData] = await Promise.all([
          api.getEmployees(),
          api.getDrivers(),
          api.getVehicles(),
          api.getExcavators(),
        ]);

        setEmployees(employeesData);
        setDrivers(driversData);
        setVehicles(vehiclesData);
        setExcavators(excavatorsData);

        // Initialize attendance state
        const empAttendance: Record<string, boolean> = {};
        employeesData.forEach((emp: any) => empAttendance[emp.id] = false);
        setAttendance(empAttendance);

        const drvAttendance: Record<string, boolean> = {};
        driversData.forEach((drv: any) => drvAttendance[drv.id] = false);
        setDriverAttendance(drvAttendance);

        const engaged: Record<string, boolean> = {};
        const hours: Record<string, string> = {};
        const miles: Record<string, string> = {};
        vehiclesData.forEach((v: any) => {
          engaged[v.id] = false;
          hours[v.id] = '';
          miles[v.id] = '';
        });
        setTrucksEngaged(engaged);
        setVehicleHours(hours);
        setMileage(miles);

      } catch (error) {
        console.error('Error loading master data:', error);
        alert('Failed to load data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    }
    loadMasterData();
  }, []);

  // Load daily data when date changes
  useEffect(() => {
    async function loadDailyData() {
      try {
        const [
          attendanceData,
          driverAttendanceData,
          vehicleOpsData,
          mileageData,
          fuelData,
          deliveriesData,
          excavatorLogsData,
          quarryData,
        ] = await Promise.all([
          api.getAttendance(currentDate),
          api.getDriverAttendance(currentDate),
          api.getVehicleOperations(currentDate),
          api.getMileageLogs(currentDate),
          api.getFuelEntries(50),
          api.getDeliveries(50),
          api.getExcavatorLogs(50),
          api.getQuarryProduction(50),
        ]);

        // Update attendance
        const empAtt: Record<string, boolean> = {};
        employees.forEach((emp: any) => {
          const record = attendanceData.find((a: any) => a.employeeId === emp.id);
          empAtt[emp.id] = record?.present || false;
        });
        setAttendance(empAtt);

        // Update driver attendance
        const drvAtt: Record<string, boolean> = {};
        drivers.forEach((drv: any) => {
          const record = driverAttendanceData.find((a: any) => a.driverId === drv.id);
          drvAtt[drv.id] = record?.present || false;
        });
        setDriverAttendance(drvAtt);

        // Update vehicle operations
        const engaged: Record<string, boolean> = {};
        const hours: Record<string, string> = {};
        vehicles.forEach((v: any) => {
          const record = vehicleOpsData.find((op: any) => op.vehicleId === v.id);
          engaged[v.id] = record?.engaged || false;
          hours[v.id] = record?.hoursWorked?.toString() || '';
        });
        setTrucksEngaged(engaged);
        setVehicleHours(hours);

        // Update mileage
        const miles: Record<string, string> = {};
        vehicles.forEach((v: any) => {
          const record = mileageData.find((m: any) => m.vehicleId === v.id);
          miles[v.id] = record?.mileage?.toString() || '';
        });
        setMileage(miles);

        setFuelEntries(fuelData);
        setDeliveries(deliveriesData);
        setExcavatorLogs(excavatorLogsData);
        setQuarryProduction(quarryData);

      } catch (error) {
        console.error('Error loading daily data:', error);
      }
    }

    if (employees.length > 0) {
      loadDailyData();
    }
  }, [currentDate, employees, drivers, vehicles]);

  // Handlers
  const toggleAttendance = (employeeId: string) => {
    setAttendance(prev => ({ ...prev, [employeeId]: !prev[employeeId] }));
  };

  const toggleDriverAttendance = (driverId: string) => {
    setDriverAttendance(prev => ({ ...prev, [driverId]: !prev[driverId] }));
  };

  const toggleTruckEngaged = (vehicleId: string) => {
    setTrucksEngaged(prev => ({ ...prev, [vehicleId]: !prev[vehicleId] }));
  };

  const markAllPresent = () => {
    const newAttendance: Record<string, boolean> = {};
    employees.forEach(emp => newAttendance[emp.id] = true);
    setAttendance(newAttendance);
  };

  const markAllTrucksEngaged = () => {
    const newTrucks: Record<string, boolean> = {};
    vehicles.forEach(v => newTrucks[v.id] = true);
    setTrucksEngaged(newTrucks);
  };

  const saveAttendance = async () => {
    try {
      const promises = Object.entries(attendance).map(([employeeId, present]) =>
        api.saveAttendance({ date: currentDate, employeeId, present })
      );
      await Promise.all(promises);
      const presentCount = Object.values(attendance).filter(Boolean).length;
      alert(`✅ Attendance saved!\n${presentCount}/${employees.length} employees present`);
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('❌ Failed to save attendance');
    }
  };

  const saveDriverAttendance = async () => {
    try {
      const promises = Object.entries(driverAttendance).map(([driverId, present]) =>
        api.saveDriverAttendance({ date: currentDate, driverId, present })
      );
      await Promise.all(promises);
      const presentCount = Object.values(driverAttendance).filter(Boolean).length;
      alert(`✅ Driver attendance saved!\n${presentCount}/${drivers.length} drivers present`);
    } catch (error) {
      console.error('Error saving driver attendance:', error);
      alert('❌ Failed to save driver attendance');
    }
  };

  const saveVehicleData = async () => {
    try {
      const promises = Object.keys(trucksEngaged).map(vehicleId =>
        api.saveVehicleOperation({
          date: currentDate,
          vehicleId,
          engaged: trucksEngaged[vehicleId],
          hoursWorked: vehicleHours[vehicleId] ? parseFloat(vehicleHours[vehicleId]) : undefined,
        })
      );
      await Promise.all(promises);
      const engaged = Object.values(trucksEngaged).filter(Boolean).length;
      const hoursEntered = Object.values(vehicleHours).filter(h => h && parseFloat(h) > 0).length;
      alert(`✅ Vehicle data saved!\n${engaged} trucks engaged\n${hoursEntered} vehicles with hours logged`);
    } catch (error) {
      console.error('Error saving vehicle data:', error);
      alert('❌ Failed to save vehicle data');
    }
  };

  const saveMileage = async () => {
    try {
      const promises = Object.entries(mileage)
        .filter(([, value]) => value && parseFloat(value) > 0)
        .map(([vehicleId, value]) =>
          api.saveMileageLog({
            date: currentDate,
            vehicleId,
            mileage: parseFloat(value),
          })
        );
      await Promise.all(promises);
      const mileageEntered = Object.values(mileage).filter(m => m && parseFloat(m) > 0).length;
      const totalMileageVal = Object.values(mileage).reduce((sum, m) => sum + (parseFloat(m) || 0), 0);
      alert(`✅ Mileage saved!\n${mileageEntered} vehicles logged\nTotal: ${totalMileageVal.toFixed(1)} km`);
    } catch (error) {
      console.error('Error saving mileage:', error);
      alert('❌ Failed to save mileage');
    }
  };

  const addFuelEntry = async (fuelData: any) => {
    try {
      // Find vehicle by registration number
      const vehicle = vehicles.find(v => v.registrationNo === fuelData.vehicle) || 
                      excavators.find(e => e.name === fuelData.vehicle);
      
      if (!vehicle) {
        alert('⚠️ Vehicle not found');
        return;
      }

      const newEntry = await api.createFuelEntry({
        date: fuelData.date,
        vehicleId: vehicle.id,
        product: fuelData.product,
        quantity: parseFloat(fuelData.quantity),
        amount: parseFloat(fuelData.amount),
      });

      setFuelEntries([newEntry, ...fuelEntries]);
      alert('✅ Fuel entry added successfully!');
    } catch (error) {
      console.error('Error adding fuel entry:', error);
      alert('❌ Failed to add fuel entry');
    }
  };

  const addDelivery = async (deliveryData: any) => {
    try {
      const vehicle = vehicles.find(v => v.registrationNo === deliveryData.vehicle);
      
      if (!vehicle) {
        alert('⚠️ Vehicle not found');
        return;
      }

      const newDelivery = await api.createDelivery({
        date: deliveryData.date,
        vehicleId: vehicle.id,
        destination: deliveryData.destination,
        material: deliveryData.material,
        wbTicket: deliveryData.wbTicket,
        dNote: deliveryData.dNote,
        quantity: parseFloat(deliveryData.quantity),
      });

      setDeliveries([newDelivery, ...deliveries]);
      alert('✅ Delivery recorded successfully!');
    } catch (error) {
      console.error('Error adding delivery:', error);
      alert('❌ Failed to add delivery');
    }
  };

  const addExcavatorLog = async (logData: any) => {
    try {
      const excavator = excavators.find(e => e.name === logData.excavator);
      
      if (!excavator) {
        alert('⚠️ Excavator not found');
        return;
      }

      const newLog = await api.createExcavatorLog({
        date: logData.date,
        excavatorId: excavator.id,
        location: logData.location,
        bucketHrs: logData.bucketHrs ? parseFloat(logData.bucketHrs) : undefined,
        breakerHrs: logData.breakerHrs ? parseFloat(logData.breakerHrs) : undefined,
        totalHrs: parseFloat(logData.totalHrs),
        meterReading: logData.meterReading ? parseFloat(logData.meterReading) : undefined,
        fuelUsed: logData.fuel ? parseFloat(logData.fuel) : undefined,
        hydraulicOil: logData.hydraulicOil ? parseFloat(logData.hydraulicOil) : undefined,
      });

      setExcavatorLogs([newLog, ...excavatorLogs]);
      alert('✅ Excavator log added!');
    } catch (error) {
      console.error('Error adding excavator log:', error);
      alert('❌ Failed to add excavator log');
    }
  };

  const addQuarryProduction = async (prodData: any) => {
    try {
      const newProd = await api.createQuarryProduction({
        date: prodData.date,
        shift: prodData.shift,
        product: prodData.product,
        trucks: parseInt(prodData.trucks),
        tonnes: parseFloat(prodData.tonnes),
      });

      setQuarryProduction([newProd, ...quarryProduction]);
      alert('✅ Quarry production recorded!');
    } catch (error) {
      console.error('Error adding quarry production:', error);
      alert('❌ Failed to add quarry production');
    }
  };

  const changeDate = (days: number) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + days);
    setCurrentDate(date.toISOString().split('T')[0]);
  };

  const exportToCSV = () => {
    alert('📥 Export feature coming soon!\nWill export all data to Excel/CSV format.');
  };

  // Calculated values
  const presentCount = Object.values(attendance).filter(Boolean).length;
  const driversPresent = Object.values(driverAttendance).filter(Boolean).length;
  const trucksEngagedCount = Object.values(trucksEngaged).filter(Boolean).length;
  const todayDeliveries = deliveries.filter(d => {
    const deliveryDate = new Date(d.date).toISOString().split('T')[0];
    return deliveryDate === currentDate;
  });
  const todayFuel = fuelEntries.filter(f => {
    const fuelDate = new Date(f.date).toISOString().split('T')[0];
    return fuelDate === currentDate;
  });
  const totalHours = Object.values(vehicleHours).reduce((sum, h) => sum + (parseFloat(h) || 0), 0);
  const totalMileage = Object.values(mileage).reduce((sum, m) => sum + (parseFloat(m) || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading fleet data...</p>
        </div>
      </div>
    );
  }

  // Convert data for components (registrationNo to name mapping)
  const employeeNames = employees.map(e => e.name);
  const driverNames = drivers.map(d => d.name);
  const vehicleRegNos = vehicles.map(v => v.registrationNo);
  const excavatorNames = excavators.map(e => e.name);

  // Convert attendance records to use names instead of IDs
  const attendanceByName: Record<string, boolean> = {};
  employees.forEach(emp => {
    attendanceByName[emp.name] = attendance[emp.id] || false;
  });

  const driverAttendanceByName: Record<string, boolean> = {};
  drivers.forEach(drv => {
    driverAttendanceByName[drv.name] = driverAttendance[drv.id] || false;
  });

  const trucksEngagedByRegNo: Record<string, boolean> = {};
  const vehicleHoursByRegNo: Record<string, string> = {};
  const mileageByRegNo: Record<string, string> = {};
  vehicles.forEach(v => {
    trucksEngagedByRegNo[v.registrationNo] = trucksEngaged[v.id] || false;
    vehicleHoursByRegNo[v.registrationNo] = vehicleHours[v.id] || '';
    mileageByRegNo[v.registrationNo] = mileage[v.id] || '';
  });

  // Handlers that convert names back to IDs
  const handleToggleAttendance = (name: string) => {
    const emp = employees.find(e => e.name === name);
    if (emp) toggleAttendance(emp.id);
  };

  const handleToggleDriverAttendance = (name: string) => {
    const drv = drivers.find(d => d.name === name);
    if (drv) toggleDriverAttendance(drv.id);
  };

  const handleToggleTruckEngaged = (regNo: string) => {
    const veh = vehicles.find(v => v.registrationNo === regNo);
    if (veh) toggleTruckEngaged(veh.id);
  };

  const handleSetVehicleHours = (hours: Record<string, string>) => {
    const newHours: Record<string, string> = {};
    Object.entries(hours).forEach(([regNo, value]) => {
      const veh = vehicles.find(v => v.registrationNo === regNo);
      if (veh) newHours[veh.id] = value;
    });
    setVehicleHours(newHours);
  };

  const handleSetMileage = (miles: Record<string, string>) => {
    const newMiles: Record<string, string> = {};
    Object.entries(miles).forEach(([regNo, value]) => {
      const veh = vehicles.find(v => v.registrationNo === regNo);
      if (veh) newMiles[veh.id] = value;
    });
    setMileage(newMiles);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Fleet Management System</h1>
                <p className="text-blue-100 text-sm">Complete Operations Dashboard</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <button onClick={() => changeDate(-1)} className="p-1 hover:bg-blue-700 rounded">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                  <p className="text-sm text-blue-100">Selected Date</p>
                  <p className="font-semibold">{new Date(currentDate).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                </div>
                <button onClick={() => changeDate(1)} className="p-1 hover:bg-blue-700 rounded">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            <NavButton icon={<Home className="w-4 h-4" />} label="Dashboard" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
            <NavButton icon={<Users className="w-4 h-4" />} label="Attendance" active={currentView === 'attendance'} onClick={() => setCurrentView('attendance')} />
            <NavButton icon={<Truck className="w-4 h-4" />} label="Vehicles" active={currentView === 'vehicles'} onClick={() => setCurrentView('vehicles')} />
            <NavButton icon={<Navigation className="w-4 h-4" />} label="Mileage" active={currentView === 'mileage'} onClick={() => setCurrentView('mileage')} />
            <NavButton icon={<Fuel className="w-4 h-4" />} label="Fuel" active={currentView === 'fuel'} onClick={() => setCurrentView('fuel')} />
            <NavButton icon={<Truck className="w-4 h-4" />} label="Deliveries" active={currentView === 'deliveries'} onClick={() => setCurrentView('deliveries')} />
            <NavButton icon={<Drill className="w-4 h-4" />} label="Excavators" active={currentView === 'excavators'} onClick={() => setCurrentView('excavators')} />
            <NavButton icon={<Mountain className="w-4 h-4" />} label="Quarry" active={currentView === 'quarry'} onClick={() => setCurrentView('quarry')} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {currentView === 'dashboard' && (
          <DashboardView 
            presentCount={presentCount}
            trucksEngagedCount={trucksEngagedCount}
            todayDeliveries={todayDeliveries}
            todayFuel={todayFuel}
            totalHours={totalHours}
            totalMileage={totalMileage}
            deliveries={deliveries}
            exportToCSV={exportToCSV}
            setCurrentView={setCurrentView}
            employeesCount={employees.length}
            vehiclesCount={vehicles.length}
          />
        )}

        {currentView === 'attendance' && (
          <AttendanceView
            attendance={attendanceByName}
            driverAttendance={driverAttendanceByName}
            employees={employeeNames}
            drivers={driverNames}
            toggleAttendance={handleToggleAttendance}
            toggleDriverAttendance={handleToggleDriverAttendance}
            markAllPresent={markAllPresent}
            saveAttendance={saveAttendance}
            saveDriverAttendance={saveDriverAttendance}
          />
        )}

        {currentView === 'vehicles' && (
          <VehiclesView
            vehicles={vehicleRegNos}
            trucksEngaged={trucksEngagedByRegNo}
            vehicleHours={vehicleHoursByRegNo}
            toggleTruckEngaged={handleToggleTruckEngaged}
            setVehicleHours={handleSetVehicleHours}
            markAllTrucksEngaged={markAllTrucksEngaged}
            saveVehicleData={saveVehicleData}
          />
        )}

        {currentView === 'mileage' && (
          <MileageView
            vehicles={vehicleRegNos}
            mileage={mileageByRegNo}
            setMileage={handleSetMileage}
            saveMileage={saveMileage}
          />
        )}

        {currentView === 'fuel' && (
          <FuelView
            fuelEntries={fuelEntries}
            vehicles={vehicleRegNos}
            excavators={excavatorNames}
            onAddFuelEntry={addFuelEntry}
            currentDate={currentDate}
          />
        )}

        {currentView === 'deliveries' && (
          <DeliveriesView
            deliveries={deliveries}
            vehicles={vehicleRegNos}
            onAddDelivery={addDelivery}
            currentDate={currentDate}
          />
        )}

        {currentView === 'excavators' && (
          <ExcavatorsView
            excavatorLogs={excavatorLogs}
            excavators={excavatorNames}
            onAddExcavatorLog={addExcavatorLog}
            currentDate={currentDate}
          />
        )}

        {currentView === 'quarry' && (
          <QuarryView
            quarryProduction={quarryProduction}
            onAddQuarryProduction={addQuarryProduction}
            currentDate={currentDate}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
          Fleet Management System v1.0 - Connected to Database ✅
        </div>
      </footer>
    </div>
  );
}