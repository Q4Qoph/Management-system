// FILE: app/api/excavator-logs/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const logs = await prisma.excavatorLog.findMany({
      take: limit,
      orderBy: { date: 'desc' },
      include: {
        excavator: true,
      },
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error fetching excavator logs:', error);
    return NextResponse.json({ error: 'Failed to fetch excavator logs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      date,
      excavatorId,
      location,
      bucketHrs,
      breakerHrs,
      totalHrs,
      meterReading,
      fuelUsed,
      hydraulicOil,
    } = body;

    const log = await prisma.excavatorLog.create({
      data: {
        date: new Date(date),
        excavatorId,
        location,
        bucketHrs: bucketHrs ? parseFloat(bucketHrs) : null,
        breakerHrs: breakerHrs ? parseFloat(breakerHrs) : null,
        totalHrs: parseFloat(totalHrs),
        meterReading: meterReading ? parseFloat(meterReading) : null,
        fuelUsed: fuelUsed ? parseFloat(fuelUsed) : null,
        hydraulicOil: hydraulicOil ? parseFloat(hydraulicOil) : null,
      },
      include: {
        excavator: true,
      },
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error('Error creating excavator log:', error);
    return NextResponse.json({ error: 'Failed to create excavator log' }, { status: 500 });
  }
}