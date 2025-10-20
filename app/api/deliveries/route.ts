// FILE: app/api/deliveries/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const deliveries = await prisma.delivery.findMany({
      take: limit,
      orderBy: { date: 'desc' },
      include: {
        vehicle: true,
        driver: true,
      },
    });

    return NextResponse.json(deliveries);
  } catch (error) {
    console.error('Error fetching deliveries:', error);
    return NextResponse.json({ error: 'Failed to fetch deliveries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, vehicleId, driverId, destination, material, wbTicket, dNote, quantity } = body;

    const delivery = await prisma.delivery.create({
      data: {
        date: new Date(date),
        vehicleId,
        driverId: driverId || null,
        destination,
        material,
        wbTicket: wbTicket || null,
        dNote: dNote || null,
        quantity: parseFloat(quantity),
      },
      include: {
        vehicle: true,
        driver: true,
      },
    });

    return NextResponse.json(delivery);
  } catch (error) {
    console.error('Error creating delivery:', error);
    return NextResponse.json({ error: 'Failed to create delivery' }, { status: 500 });
  }
}