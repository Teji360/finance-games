import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Extract the symbol from the query string
    const url = new URL(request.url);
    const symbol = url.searchParams.get('symbol'); // Get the 'symbol' query parameter
    
    if (!symbol) {
      return NextResponse.json({ error: "Missing 'symbol' query parameter" }, { status: 400 });
    }

    // Fetch the market data for the dynamically passed symbol
    const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`);
    const data = await res.json();

    // Fetch the company details (name)
    const companyRes = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`);
    const companyData = await companyRes.json();

    // If both API calls were successful, return the stock price and company name
    if (data && data.c !== undefined && companyData && companyData.name) {
      return NextResponse.json({
        price: data.c,
        name: companyData.name, // Include the company name in the response
      });
    } else {
      return NextResponse.json({ error: "Failed to fetch market data or company info" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error fetching market data:", error);
    return NextResponse.json({ error: "Failed to fetch market data" }, { status: 500 });
  }
}
