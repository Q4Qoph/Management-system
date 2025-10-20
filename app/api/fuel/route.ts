// FILE: app/api/fuel/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const fuelEntries = await prisma.fuelEntry.findMany({
      take: limit,
      orderBy: { date: 'desc' },
      include: {
        vehicle: true,
      },
    });

    return NextResponse.json(fuelEntries);
  } catch (error) {
    console.error('Error fetching fuel entries:', error);
    return NextResponse.json({ error: 'Failed to fetch fuel entries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, vehicleId, product, quantity, amount } = body;

    const fuelEntry = await prisma.fuelEntry.create({
      data: {
        date: new Date(date),
        vehicleId,
        product,
        quantity: parseFloat(quantity),
        amount: parseFloat(amount),
      },
      include: {
        vehicle: true,
      },
    });

    return NextResponse.json(fuelEntry);
  } catch (error) {
    console.error('Error creating fuel entry:', error);
    return NextResponse.json({ error: 'Failed to create fuel entry' }, { status: 500 });
  }
}