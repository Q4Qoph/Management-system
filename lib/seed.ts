import { prisma } from './prisma';

const EMPLOYEES = [
  'BAKARI.M', 'MOHAMED.S', 'RAJAB.J', 'A.KOMBO', 'ISSA.I', 'SUDI.H',
  'ELVIS.K', 'MICHAEL.M', 'SIDNY.M', 'JOSEPH.M', 'PATRICK.K', 'KELVIN.C',
  'NELSON', 'BONFACE.M', 'MKUZI.P', 'MUTHII', 'YASIN.S', 'FADHIL.M'
];

const DRIVERS = ['Silvano', 'Shee', 'Abdalla', 'Abdul', 'Yassin', 'Solomon'];

const VEHICLES = [
  'KDK 701D', 'KDH 262M', 'KDL 927E', 'KDJ 985Q', 'KCZ 035J', 'KCS 905M',
  'KCC 115A', 'KBP 974A', 'KBP 968A', 'KBQ 290U', 'KBQ 296U', 'KCT 704X',
  'KDE 658K', 'KDJ 551L', 'KDS 164R', 'KDS 165R'
];

const EXCAVATORS = ['Excavator 1', 'Excavator 2'];

async function seed() {
  console.log('🌱 Seeding database...');

  // Seed Employees
  for (const name of EMPLOYEES) {
    await prisma.employee.upsert({
      where: { name },
      update: {},
      create: { name, position: 'Staff', active: true },
    });
  }
  console.log('✅ Employees seeded');

  // Seed Drivers
  for (const name of DRIVERS) {
    await prisma.driver.upsert({
      where: { name },
      update: {},
      create: { name, active: true },
    });
  }
  console.log('✅ Drivers seeded');

  // Seed Vehicles
  for (const regNo of VEHICLES) {
    await prisma.vehicle.upsert({
      where: { registrationNo: regNo },
      update: {},
      create: { 
        registrationNo: regNo, 
        type: 'Truck',
        status: 'Active',
        active: true 
      },
    });
  }
  console.log('✅ Vehicles seeded');

  // Seed Excavators
  for (const name of EXCAVATORS) {
    await prisma.excavator.upsert({
      where: { name },
      update: {},
      create: { name, active: true },
    });
  }
  console.log('✅ Excavators seeded');

  console.log('🎉 Seeding complete!');
}

seed()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
