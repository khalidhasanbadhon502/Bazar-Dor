"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/api";
import { bn } from "@/lib/helpers";
import ProductCard from "@/components/ProductCard";

type SortKey = "default" | "price-asc" | "price-desc" | "up" | "down";

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
  { value: "up", label: "সবচেয়ে বেশি বেড়েছে" },
  { value: "down", label: "সবচেয়ে বেশি কমেছে" },
];

export default function CategoryList({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.today - b.today);
      case "price-desc":
        return list.sort((a, b) => b.today - a.today);
      case "up":
        return list.sort((a, b) => b.change.pct - a.change.pct);
      case "down":
        return list.sort((a, b) => a.change.pct - b.change.pct);
      default:
        return list.sort((a, b) => a.id - b.id);
    }
  }, [products, sort]);

  return (
    <>
      <div className="sortbar">
        <label htmlFor="sort">সাজান</label>
        <select
          id="sort"
          className="select"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <p className="cat-total">
        মোট {bn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}