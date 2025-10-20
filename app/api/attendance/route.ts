// FILE: app/api/attendance/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json({ error: 'Date parameter required' }, { status: 400 });
    }

    const attendance = await prisma.attendance.findMany({
      where: {
        date: new Date(date),
      },
      include: {
        employee: true,
      },
    });

    return NextResponse.json(attendance);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, employeeId, present } = body;

    const attendance = await prisma.attendance.upsert({
      where: {
        date_employeeId: {
          date: new Date(date),
          employeeId,
        },
      },
      update: { present },
      create: {
        date: new Date(date),
        employeeId,
        present,
      },
    });

    return NextResponse.json(attendance);
  } catch (error) {
    console.error('Error saving attendance:', error);
    return NextResponse.json({ error: 'Failed to save attendance' }, { status: 500 });
  }
}
