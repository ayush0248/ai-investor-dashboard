import { NextResponse } from 'next/server';

// Ensure latestSummary is initialized properly
let latestSummary: any = null;

// Return the latest tax summary
export async function GET() {
  if (!latestSummary) {
    return NextResponse.json({ error: 'No tax data available. Please calculate your tax first.' }, { status: 404 });
  }
  return NextResponse.json(latestSummary);
}

// Temporary example for POSTing data (if needed)
export async function POST(req: Request) {
  try {
    const data = await req.json();
    latestSummary = data;
    return NextResponse.json({ success: true, latestSummary });
  } catch (error) {
    return NextResponse.json({ error: 'Error storing tax data' }, { status: 500 });
  }
}
