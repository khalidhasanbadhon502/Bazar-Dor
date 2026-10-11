// app/page.tsx
import { getProducts } from "@/lib/api";
import { bn } from "@/lib/helpers";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

// "দাম বেড়েছে / কমেছে" সেকশনে কয়টা পণ্য দেখাবে
const LIMIT = 6;

export default async function Home() {
  const products = await getProducts();

  // সবচেয়ে বেশি বাড়া পণ্য (শতাংশ অনুযায়ী বড় থেকে ছোট)
  const increased = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, LIMIT);

  // সবচেয়ে বেশি কমা পণ্য (বেশি কমা আগে)
  const decreased = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, LIMIT);

  return (
    <div className="container">
      <Hero />

      {products.length === 0 ? (
        <section className="section">
          <p className="section__sub">
            ডেটা লোড করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।
          </p>
        </section>
      ) : (
        <>
          <section className="section">
            <h2 className="section__title">
              <span className="up">▲</span> আজ দাম বেড়েছে
            </h2>
            <div className="grid">
              {increased.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>

          <section className="section">
            <h2 className="section__title">
              <span className="down">▼</span> আজ দাম কমেছে
            </h2>
            <div className="grid">
              {decreased.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>

          <section className="section" id="all-products">
            <h2 className="section__title section__title--plain">সব পণ্য</h2>
            <p className="section__sub">
              মোট {bn(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>
            <div className="grid">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}