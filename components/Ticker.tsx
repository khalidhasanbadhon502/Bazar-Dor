
import { getProducts } from "@/lib/api";
import { bn, trend } from "@/lib/helpers";

const SHORT_UNIT: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export default async function Ticker() {
  const products = await getProducts();
  if (products.length === 0) return null;

  const items = [...products, ...products];

  return (
    <div className="ticker">
      <div className="ticker__track">
        {items.map((p, i) => {
          const { dir, arrow } = trend(p.change.dir);
          return (
            <span className="ticker__item" key={`${p.id}-${i}`}>
              <span>{p.image}</span>
              <span>{p.nameBn}</span>
              <span>
                {bn(p.today)} টাকা/{SHORT_UNIT[p.unit] ?? p.unit}
              </span>
              <span className={dir}>
                {arrow} {bn(Math.abs(p.change.pct).toFixed(1))}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}