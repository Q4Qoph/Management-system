// FILE: app/api/quarry/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const production = await prisma.quarryProduction.findMany({
      take: limit,
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(production);
  } catch (error) {
    console.error('Error fetching quarry production:', error);
    return NextResponse.json({ error: 'Failed to fetch quarry production' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, shift, product, trucks, tonnes } = body;

    const production = await prisma.quarryProduction.create({
      data: {
        date: new Date(date),
        shift,
        product,
        trucks: parseInt(trucks),
        tonnes: parseFloat(tonnes),
      },
    });

    return NextResponse.json(production);
  } catch (error) {
    console.error('Error creating quarry production:', error);
    return NextResponse.json({ error: 'Failed to create quarry production' }, { status: 500 });
  }
}
