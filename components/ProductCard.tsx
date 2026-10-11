
import Link from "next/link";
import type { Product } from "@/lib/api";
import { bn, num, trend, unitLabel } from "@/lib/helpers";

export default function ProductCard({ product }: { product: Product }) {
  const { dir, arrow } = trend(product.change.dir);

  return (
    <Link href={`/product/${product.id}`} className="card">
      <div className="card__head">
        <div className="card__icon">{product.image}</div>
        <div>
          <div className="card__name">{product.nameBn}</div>
          <div className="card__unit">{unitLabel(product.unit)}</div>
        </div>
      </div>

      <div className="card__label">আজকের দাম</div>
      <div className="card__row">
        <div className="card__price">
          {bn(product.today)} <small>টাকা</small>
        </div>
        <span className={`badge ${dir}`}>
          {arrow} {num(Math.abs(product.change.pct))}%
        </span>
      </div>
    </Link>
  );
}