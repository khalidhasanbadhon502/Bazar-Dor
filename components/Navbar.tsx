"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import TodayDate from "@/components/TodayDate";
import toast from "react-hot-toast";

const CATEGORIES = [
  { slug: "chal", name: "চাল", icon: "🍚" },
  { slug: "dal", name: "ডাল", icon: "🫘" },
  { slug: "tel", name: "তেল", icon: "🛢️" },
  { slug: "sobji", name: "সবজি", icon: "🥬" },
  { slug: "mach", name: "মাছ", icon: "🐟" },
  { slug: "mangsho", name: "মাংস", icon: "🍗" },
  { slug: "dim-dui", name: "ডিম-দুধ", icon: "🥛" },
  { slug: "mosla", name: "মসলা", icon: "🌶️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

 
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleSignOut() {
    try {
      await authClient.signOut();
      toast.success("সফলভাবে সাইন আউট করা হয়েছে!");
      setIsOpen(false);
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে!");
    }
  }

  return (
    <header className="navbar">
      <div className="container navbar__top">
        <Link href="/" className="brand">
          <div className="brand__logo">
            <Image
              src="/images/logo-icon.png"
              alt="বাজার দর"
              width={20}
              height={20}
            />
          </div>
          <div>
            <div className="brand__title">বাজার দর</div>
            <div className="brand__sub">
              <TodayDate />
            </div>
          </div>
        </Link>

        <div className="navbar__actions">
          {isPending ? null : user ? (
            <div className="dropdown" ref={dropdownRef}>
             
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="dropdown__trigger user"
                type="button"
              >
                <span className="user__avatar">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.image} alt={user.name} />
                  ) : (
                    user.name?.charAt(0).toUpperCase()
                  )}
                </span>
                <span className="user__name">{user.name?.split(" ")[0]}</span>
              </button>

         
              {isOpen && (
                <div className="dropdown__menu">
                  <div className="dropdown__header">
                    <div className="dropdown__name">{user.name}</div>
                    <div className="dropdown__email">{user.email}</div>
                  </div>

                  <div className="dropdown__items">
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="dropdown__item"
                    >
                      <span>👤</span>
                      <span>আমার প্রোফাইল</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="dropdown__item dropdown__item--danger"
                    >
                      <span>↪️</span>
                      <span>সাইন আউট</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/signin">সাইন ইন</Link>
              <Link href="/signup" className="btn">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="navbar__links">
        <nav className="container nav">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={
                pathname === `/category/${c.slug}` ? "is-active" : undefined
              }
            >
              <span>{c.icon}</span> {c.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}