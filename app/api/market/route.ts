import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Extract the symbol from the query string
    const url = new URL(request.url);
    const symbol = url.searchParams.get('symbol'); // Get the 'symbol' query parameter
    
    if (!symbol) {
      return NextResponse.json({ error: "Missing 'symbol' query parameter" }, { status: 400 });
    }

    // Fetch the market data (stock price) for the dynamically passed symbol
    const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`);
    const data = await res.json();

    // Fetch the company details (name)
    const companyRes = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`);
    const companyData = await companyRes.json();

    // Fetch the market news for the given symbol
    const newsRes = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`);
    const newsData = await newsRes.json();

    // If all API calls were successful, return the stock price, company name, and news
    if (data && data.c !== undefined && companyData && companyData.name && newsData) {
      return NextResponse.json({
        price: data.c,             // Stock price
        name: companyData.name,    // Company name
        news: newsData,            // Market news
      });
    } else {
      return NextResponse.json({ error: "Failed to fetch market data, company info, or news" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
