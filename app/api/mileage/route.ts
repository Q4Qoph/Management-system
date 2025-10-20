// FILE: app/api/mileage/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json({ error: 'Date parameter required' }, { status: 400 });
    }

    const logs = await prisma.mileageLog.findMany({
      where: {
        date: new Date(date),
      },
      include: {
        vehicle: true,
      },
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error fetching mileage logs:', error);
    return NextResponse.json({ error: 'Failed to fetch mileage logs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, vehicleId, mileage } = body;

    const log = await prisma.mileageLog.upsert({
      where: {
        date_vehicleId: {
          date: new Date(date),
          vehicleId,
        },
      },
      update: { mileage: parseFloat(mileage) },
      create: {
        date: new Date(date),
        vehicleId,
        mileage: parseFloat(mileage),
      },
      include: {
        vehicle: true,
      },
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error('Error saving mileage log:', error);
    return NextResponse.json({ error: 'Failed to save mileage log' }, { status: 500 });
  }
}
