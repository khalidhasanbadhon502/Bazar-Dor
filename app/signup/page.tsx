"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { GoogleIcon, GitHubIcon } from "@/components/SocialIcons";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirm) {
      toast.error("সব ঘর পূরণ করুন।");
      return;
    }
    if (password.length < 8) {
      const msg = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (password !== confirm) {
      const msg = "দুটি পাসওয়ার্ড মেলেনি।";
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      const msg = error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।";
      setError(msg);
      toast.error(msg);
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
    router.push("/");
    router.refresh();
  }

  async function social(provider: "google" | "github") {
    await authClient.signIn.social({ provider, callbackURL: "/" });
  }

  return (
    <div className="container auth">
      <h1 className="auth__title">সাইন আপ</h1>
      <p className="auth__sub">নতুন অ্যাকাউন্ট তৈরি করে শুরু করুন।</p>

      <form className="auth__card" onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}

        <div className="field">
          <label htmlFor="name">নাম</label>
          <input
            id="name"
            type="text"
            className="input"
            placeholder="আপনার নাম"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
            <GoogleIcon />
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>
          <button
            type="button"
            className="btn-social"
            onClick={() => social("github")}
          >
            <GitHubIcon />
            <span>GitHub দিয়ে চালিয়ে যান</span>
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