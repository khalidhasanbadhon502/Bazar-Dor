
const BASE_URL =
  process.env.BASE_URL_1 ?? "https://api.api-store.workers.dev/api/bazardor";

export type Dir = "up" | "down" | "flat";

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: Dir; pct: number };
  markets: Market[];
}

async function request<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (err) {
    console.error("API request failed:", path, err);
    return null;
  }
}

export async function getProducts(): Promise<Product[]> {
  return (await request<Product[]>("/products")) ?? [];
}

export async function getCategories(): Promise<Category[]> {
  return (await request<Category[]>("/categories")) ?? [];
}


export async function getProduct(idOrSlug: string): Promise<Product | null> {
  if (/^\d+$/.test(idOrSlug)) {
    return request<Product>(`/products/${idOrSlug}`);
  }
  const list = await request<Product[]>(
    `/products?slug=${encodeURIComponent(idOrSlug)}`
  );
  return list?.[0] ?? null;
}