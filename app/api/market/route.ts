import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=${process.env.FINNHUB_API_KEY}`);
    const data = await res.json();

    return NextResponse.json({ price: data.c });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch market data" }, { status: 500 });
  }
}
