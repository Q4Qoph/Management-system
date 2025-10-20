// FILE: lib/api.ts
// API utility functions for frontend

export async function fetchAPI(endpoint: string, options?: RequestInit) {
  const response = await fetch(`/api${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
}

// ============================================
// EMPLOYEES & ATTENDANCE
// ============================================

export async function getEmployees() {
  return fetchAPI('/employees');
}

export async function getAttendance(date: string) {
  return fetchAPI(`/attendance?date=${date}`);
}

export async function saveAttendance(data: {
  date: string;
  employeeId: string;
  present: boolean;
}) {
  return fetchAPI('/attendance', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getDrivers() {
  return fetchAPI('/drivers');
}

export async function getDriverAttendance(date: string) {
  return fetchAPI(`/driver-attendance?date=${date}`);
}

export async function saveDriverAttendance(data: {
  date: string;
  driverId: string;
  present: boolean;
}) {
  return fetchAPI('/driver-attendance', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ============================================
// VEHICLES
// ============================================

export async function getVehicles() {
  return fetchAPI('/vehicles');
}

export async function getVehicleOperations(date: string) {
  return fetchAPI(`/vehicle-operations?date=${date}`);
}

export async function saveVehicleOperation(data: {
  date: string;
  vehicleId: string;
  engaged: boolean;
  hoursWorked?: number;
}) {
  return fetchAPI('/vehicle-operations', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getMileageLogs(date: string) {
  return fetchAPI(`/mileage?date=${date}`);
}

export async function saveMileageLog(data: {
  date: string;
  vehicleId: string;
  mileage: number;
}) {
  return fetchAPI('/mileage', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ============================================
// FUEL
// ============================================

export async function getFuelEntries(limit = 50) {
  return fetchAPI(`/fuel?limit=${limit}`);
}

export async function createFuelEntry(data: {
  date: string;
  vehicleId: string;
  product: string;
  quantity: number;
  amount: number;
}) {
  return fetchAPI('/fuel', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ============================================
// DELIVERIES
// ============================================

export async function getDeliveries(limit = 50) {
  return fetchAPI(`/deliveries?limit=${limit}`);
}

export async function createDelivery(data: {
  date: string;
  vehicleId: string;
  driverId?: string;
  destination: string;
  material: string;
  wbTicket?: string;
  dNote?: string;
  quantity: number;
}) {
  return fetchAPI('/deliveries', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ============================================
// EXCAVATORS
// ============================================

export async function getExcavators() {
  return fetchAPI('/excavators');
}

export async function getExcavatorLogs(limit = 50) {
  return fetchAPI(`/excavator-logs?limit=${limit}`);
}

export async function createExcavatorLog(data: {
  date: string;
  excavatorId: string;
  location: string;
  bucketHrs?: number;
  breakerHrs?: number;
  totalHrs: number;
  meterReading?: number;
  fuelUsed?: number;
  hydraulicOil?: number;
}) {
  return fetchAPI('/excavator-logs', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ============================================
// QUARRY
// ============================================

export async function getQuarryProduction(limit = 50) {
  return fetchAPI(`/quarry?limit=${limit}`);
}

export async function createQuarryProduction(data: {
  date: string;
  shift: string;
  product: string;
  trucks: number;
  tonnes: number;
}) {
  return fetchAPI('/quarry', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
