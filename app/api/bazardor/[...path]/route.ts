
import { NextResponse } from "next/server";

const BASE_URL_1 = "https://api.api-store.workers.dev/api/bazardor";
const BASE_URL_2 = "https://api.abcz.workers.dev/api/bazardor";

async function proxyFetch(endpoint: string) {
  try {
    const res = await fetch(`${BASE_URL_1}${endpoint}`, {
      cache: "no-store",
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Primary API failed, trying fallback...", err);
  }

  const res = await fetch(`${BASE_URL_2}${endpoint}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch data from both APIs");
  return await res.json();
}

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const params = await context.params;
    const pathArray = params.path || [];
    const endpoint = `/${pathArray.join("/")}`;
    const data = await proxyFetch(endpoint);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data via proxy" },
      { status: 500 }
    );
  }
}