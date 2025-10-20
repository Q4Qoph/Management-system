// FILE: app/types/index.ts
export interface FuelEntry {
  date: string;
  vehicle: string;
  product: string;
  quantity: number;
  amount: number;
}

export interface Delivery {
  date: string;
  vehicle: string;
  destination: string;
  material: string;
  wbTicket: string;
  dNote: string;
  quantity: number;
}

export interface ExcavatorLog {
  date: string;
  excavator: string;
  location: string;
  bucketHrs: string;
  breakerHrs: string;
  totalHrs: string;
  meterReading: string;
  fuel: string;
  hydraulicOil: string;
}

export interface QuarryProduction {
  date: string;
  shift: string;
  product: string;
  trucks: string;
  tonnes: string;
}

export type ViewType = 'dashboard' | 'attendance' | 'vehicles' | 'mileage' | 'fuel' | 'deliveries' | 'excavators' | 'quarry';