
import Link from "next/link";
import { getProduct } from "@/lib/api";
import { bn, trend, unitLabel } from "@/lib/helpers";
import "./detail.css";

const SHORT_UNIT: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};


const fmt = (n: number) => bn(Number.isInteger(n) ? n : n.toFixed(2));

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="container detail-empty">
        <h2>পণ্যটি পাওয়া যায়নি</h2>
        <p>অনুরোধ করা পণ্যটির অস্তিত্ব নেই বা মুছে ফেলা হয়েছে।</p>
        <Link href="/" className="btn">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const { dir, arrow } = trend(product.change.dir);
  const word =
    dir === "up" ? "বেড়েছে" : dir === "down" ? "কমেছে" : "অপরিবর্তিত";
  const diff = Math.abs(product.today - product.yesterday);

  
  const rows = product.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const lowest = Math.min(...rows.map((r) => r.min));
  const highest = Math.max(...rows.map((r) => r.max));
  const average = Math.round(
    rows.reduce((sum, r) => sum + r.avg, 0) / rows.length
  );

  return (
    <div className="container detail">
      <nav className="detail-crumb">
        <Link href="/">হোম</Link>
        <span>›</span>
        <Link href={`/category/${product.category}`}>
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span>{product.nameBn}</span>
      </nav>

    
      <section className="detail-hero">
        <div className="detail-hero__left">
          <div className="detail-icon">{product.image}</div>
          <div>
            <h1 className="detail-title">{product.nameBn}</h1>
            <p className="detail-meta">
              {unitLabel(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="detail-note">
              গতকালের তুলনায় আজ দাম <strong>{word}</strong>
              {dir !== "flat" && <> · {bn(diff)} টাকা</>}
            </p>
          </div>
        </div>

        <div className="detail-price">
          <span className="detail-price__label">আজকের দাম</span>
          <span className="detail-price__value">{bn(product.today)}</span>
          <span className="detail-price__unit">
            টাকা / {SHORT_UNIT[product.unit] ?? product.unit}
          </span>
          <span className={`badge ${dir}`}>
            {arrow} {bn(Math.abs(product.change.pct).toFixed(1))}%
          </span>
        </div>
      </section>

    
      <section className="detail-panel">
        <h2 className="detail-panel__title">দামের সারসংক্ষেপ</h2>

        <div className="detail-stats">
          <div className="detail-stat">
            <span className="detail-stat__label">সর্বনিম্ন দাম</span>
            <p className="detail-stat__value down">
              {bn(lowest)} <small>টাকা</small>
            </p>
            <span className="detail-stat__sub">সবচেয়ে কম দামের বাজার</span>
          </div>
          <div className="detail-stat">
            <span className="detail-stat__label">সর্বাধিক দাম</span>
            <p className="detail-stat__value up">
              {bn(highest)} <small>টাকা</small>
            </p>
            <span className="detail-stat__sub">সবচেয়ে বেশি দামের বাজার</span>
          </div>
          <div className="detail-stat">
            <span className="detail-stat__label">গড় দাম</span>
            <p className="detail-stat__value down">
              {bn(average)} <small>টাকা</small>
            </p>
            <span className="detail-stat__sub">
              {unitLabel(product.unit)}-এর হিসাব
            </span>
          </div>
        </div>

        <h2 className="detail-panel__title">বাজারভিত্তিক আজকের দাম</h2>

        <div className="detail-table-wrap">
          <table className="detail-table">
            <thead>
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th className="num">সর্বনিম্ন</th>
                <th className="num">সর্বাধিক</th>
                <th className="num">গড়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={`${r.market}-${r.division}`}>
                  <td className="detail-table__market">{r.market}</td>
                  <td className="detail-table__div">{r.division}</td>
                  <td className="num">{bn(r.min)} টাকা</td>
                  <td className="num">{bn(r.max)} টাকা</td>
                  <td className="num detail-table__avg">{fmt(r.avg)} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}