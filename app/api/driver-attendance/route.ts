// FILE: app/api/driver-attendance/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json({ error: 'Date parameter required' }, { status: 400 });
    }

    const attendance = await prisma.driverAttendance.findMany({
      where: {
        date: new Date(date),
      },
      include: {
        driver: true,
      },
    });

    return NextResponse.json(attendance);
  } catch (error) {
    console.error('Error fetching driver attendance:', error);
    return NextResponse.json({ error: 'Failed to fetch driver attendance' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, driverId, present } = body;

    const attendance = await prisma.driverAttendance.upsert({
      where: {
        date_driverId: {
          date: new Date(date),
          driverId,
        },
      },
      update: { present },
      create: {
        date: new Date(date),
        driverId,
        present,
      },
    });

    return NextResponse.json(attendance);
  } catch (error) {
    console.error('Error saving driver attendance:', error);
    return NextResponse.json({ error: 'Failed to save driver attendance' }, { status: 500 });
  }
}