// FILE: app/api/excavators/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const excavators = await prisma.excavator.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(excavators);
  } catch (error) {
    console.error('Error fetching excavators:', error);
    return NextResponse.json({ error: 'Failed to fetch excavators' }, { status: 500 });
  }
}
