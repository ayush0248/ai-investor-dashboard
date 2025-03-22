import { NextRequest, NextResponse } from 'next/server';

let latestSummary = {}; // Temporary storage for the latest result

export async function POST(req: NextRequest) {
  try {
    const { capitalGains, dividends } = await req.json();

    // Tax Rates
    const shortTermTaxRate = 0.15; // 15% for short-term capital gains
    const dividendTaxRate = 0.20; // 20% tax on dividends

    // Calculate Taxes
    const capitalGainsTax = parseFloat(capitalGains) * shortTermTaxRate;
    const dividendTax = parseFloat(dividends) * dividendTaxRate;
    const totalTax = capitalGainsTax + dividendTax;

    latestSummary = {
      capitalGainsTax,
      dividendTax,
      totalTax,
    };

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Tax calculation failed' }, { status: 500 });
  }
}
