import { NextResponse } from 'next/server';
import { dataMock } from '@/mock/dataMock';

export async function GET() {
  return NextResponse.json(dataMock);
}
