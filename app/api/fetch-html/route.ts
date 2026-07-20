import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing 'url' parameter" }, { status: 400 });
  }

  try {
    // Validate URL format and protocol to prevent SSRF
    const url = new URL(targetUrl);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return NextResponse.json({ error: "Only HTTP and HTTPS protocols are allowed." }, { status: 400 });
    }

    // Fetch the HTML with a generic user agent to prevent basic blocks
    const response = await fetch(url.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      },
      next: { revalidate: 0 }, // No caching for live checks
    });

    if (!response.ok) {
      let errorMessage = `Failed to fetch URL. Status: ${response.status} ${response.statusText}`;

      if (response.status === 403) {
        errorMessage = "🛡️ Access Denied! Check name again";
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const html = await response.text();
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error: any) {
    console.error("Error fetching URL:", error);
    return NextResponse.json(
      { error: "Failed to fetch URL. Make sure it is a valid, publicly accessible URL." },
      { status: 500 }
    );
  }
}
