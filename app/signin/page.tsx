"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { GoogleIcon, GitHubIcon } from "@/components/SocialIcons";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      toast.error("ইমেইল এবং পাসওয়ার্ড দুটিই পূরণ করুন।");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const errMsg = "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে!");
    router.push("/");
    router.refresh();
  }

  async function social(provider: "google" | "github") {
    await authClient.signIn.social({ provider, callbackURL: "/" });
  }

  return (
    <div className="container auth">
      <h1 className="auth__title">সাইন ইন</h1>
      <p className="auth__sub">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      <form className="auth__card" onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}

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

        <button className="btn btn--block" disabled={loading}>
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
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
          অ্যাকাউন্ট নেই? <Link href="/signup">সাইন আপ করুন</Link>
        </p>
      </form>

      <Link href="/" className="auth__back">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}