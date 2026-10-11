"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setForm({ ...form, [key]: e.target.value });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      const errMsg = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }
    if (form.password !== form.confirm) {
      const errMsg = "দুটি পাসওয়ার্ড মেলেনি।";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    setLoading(false);

    if (error) {
      const errMsg = error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    toast.success("সফলভাবে অ্যাকাউন্ট তৈরি করা হয়েছে!");
    router.push("/");
    router.refresh();
  }

  async function social(provider: "google" | "github") {
    await authClient.signIn.social({ provider, callbackURL: "/" });
  }

  return (
    <div className="container auth">
      <h1 className="auth__title">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="auth__sub">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <form className="auth__card" onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}

        <div className="field">
          <label htmlFor="name">নাম</label>
          <input
            id="name"
            className="input"
            placeholder="যেমন: রহিম উদ্দিন"
            value={form.name}
            onChange={set("name")}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="email">ইমেইল</label>
          <input
            id="email"
            type="email"
            className="input"
            placeholder="you@example.com"
            value={form.email}
            onChange={set("email")}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="password">পাসওয়ার্ড</label>
          <input
            id="password"
            type="password"
            className="input"
            placeholder="কমপক্ষে ৮ অক্ষর"
            value={form.password}
            onChange={set("password")}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="confirm">পাসওয়ার্ড নিশ্চিত করুন</label>
          <input
            id="confirm"
            type="password"
            className="input"
            placeholder="আবার লিখুন"
            value={form.confirm}
            onChange={set("confirm")}
            required
          />
        </div>

        <button className="btn btn--block" disabled={loading}>
          {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>

        <div className="divider">অথবা</div>

        <div className="social">
          <button
            type="button"
            className="btn-social"
            onClick={() => social("google")}
          >
            Google দিয়ে চালিয়ে যান
          </button>
          <button
            type="button"
            className="btn-social"
            onClick={() => social("github")}
          >
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="auth__switch">
          অ্যাকাউন্ট আছে? <Link href="/signin">সাইন ইন করুন</Link>
        </p>
      </form>

      <Link href="/" className="auth__back">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}