
import Image from "next/image";
import Link from "next/link";
import TodayDate from "@/components/TodayDate";

export default function Hero() {
  return (
    <section className="hero">
      <div>
        <span className="hero__pill">
          <TodayDate />
        </span>
        <h1 className="hero__title">আজকের বাজারের দাম এক নজরে</h1>
        <p className="hero__text">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার সর্বশেষ দাম জানুন।
          গতকালের তুলনায় কোন পণ্যের দাম বেড়েছে বা কমেছে, তা সহজেই দেখুন।
        </p>
        <Link href="#all-products" className="btn">
          সব পণ্য দেখুন
        </Link>
      </div>

      <div className="hero__art">
        <Image
          src="/images/bazar-hero.png"
          alt=""
          width={315}
          height={263}
          className="hero__img"
          priority
        />
      </div>
    </section>
  );
}