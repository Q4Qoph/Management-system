// FILE: app/api/vehicle-operations/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json({ error: 'Date parameter required' }, { status: 400 });
    }

    const operations = await prisma.vehicleOperation.findMany({
      where: {
        date: new Date(date),
      },
      include: {
        vehicle: true,
      },
    });

    return NextResponse.json(operations);
  } catch (error) {
    console.error('Error fetching vehicle operations:', error);
    return NextResponse.json({ error: 'Failed to fetch vehicle operations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, vehicleId, engaged, hoursWorked } = body;

    const operation = await prisma.vehicleOperation.upsert({
      where: {
        date_vehicleId: {
          date: new Date(date),
          vehicleId,
        },
      },
      update: { engaged, hoursWorked: hoursWorked ? parseFloat(hoursWorked) : null },
      create: {
        date: new Date(date),
        vehicleId,
        engaged,
        hoursWorked: hoursWorked ? parseFloat(hoursWorked) : null,
      },
    });

    return NextResponse.json(operation);
  } catch (error) {
    console.error('Error saving vehicle operation:', error);
    return NextResponse.json({ error: 'Failed to save vehicle operation' }, { status: 500 });
  }
}