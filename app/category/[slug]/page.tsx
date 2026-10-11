
import Link from "next/link";
import { getCategories, getProducts } from "@/lib/api";
import { bn } from "@/lib/helpers";
import CategoryList from "@/components/CategoryList";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="container pd-empty">
        <h2>ক্যাটাগরিটি পাওয়া যায়নি</h2>
        <p>অনুরোধ করা ক্যাটাগরির অস্তিত্ব নেই।</p>
        <Link href="/" className="btn">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const list = products.filter((p) => p.category === slug);

  return (
    <div className="container cat">
      <section className="cat-head">
        <div className="cat-head__icon">{category.icon}</div>
        <div>
          <h1 className="cat-head__title">{category.nameBn}</h1>
          <p className="cat-head__sub">
            {bn(list.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

      <CategoryList products={list} />
    </div>
  );
}