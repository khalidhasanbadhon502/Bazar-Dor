"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isPending && !user) router.push("/signin");
  }, [isPending, user, router]);

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setImage(user.image ?? "");
    }
  }, [user]);

  
  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("ছবিটি সর্বোচ্চ ৫MB এর হতে হবে।");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    const toastId = toast.loading("ছবি আপলোড হচ্ছে...");

    try {
      const res = await fetch(
        "https://api.imgbb.com/1/upload?key=6d0e2e92ac1b09b964929b4e0d7f57cb",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();

      if (data.success) {
        setImage(data.data.url);
        toast.success("ছবি আপলোড সম্পন্ন হয়েছে! 'আপডেট' বাটনে ক্লিক করুন।", {
          id: toastId,
        });
      } else {
        toast.error("ছবি আপলোড করা যায়নি। আবার চেষ্টা করুন।", { id: toastId });
      }
    } catch {
      toast.error("ছবি আপলোডে কোনো সমস্যা হয়েছে!", { id: toastId });
    } finally {
      setUploading(false);
    }
  }

  
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না।");
      return;
    }

    setSaving(true);
    const { error } = await authClient.updateUser({
      name: name.trim(),
      image: image,
    });
    setSaving(false);

    if (error) {
      toast.error("আপডেট করা যায়নি। আবার চেষ্টা করুন।");
    } else {
      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      router.refresh();
    }
  }

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট করা হয়েছে!");
          router.push("/");
          router.refresh();
        },
      },
    });
  }

  if (isPending || !user) {
    return (
      <div className="container profile">
        <p className="section__sub">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="container profile">
      <div>
        <h1 className="auth__title" style={{ margin: 0 }}>
          আমার প্রোফাইল
        </h1>
        <p className="section__sub">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        style={{ display: "none" }}
      />

      
      <section className="card profile__head">
        <div className="profile__user">
        
          <div
            className="profile__avatar"
            onClick={handleAvatarClick}
            title="ছবি পরিবর্তন করতে ক্লিক করুন"
            style={{
              cursor: "pointer",
              position: "relative",
              border: "2px solid var(--green)",
              transition: "opacity 0.2s",
            }}
          >
            {image ? (
            
              <img src={image} alt={name} />
            ) : (
              user.name?.charAt(0).toUpperCase()
            )}

            
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0, 0, 0, 0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "12px",
                opacity: uploading ? 1 : 0,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.opacity = uploading ? "1" : "0")
              }
            >
              {uploading ? "⏳" : "📷"}
            </div>
          </div>

          <div>
            <div className="profile__name">{user.name}</div>
            <div className="profile__email">{user.email}</div>
          </div>
        </div>

        <button className="btn-signout" onClick={handleSignOut}>
          ↩ সাইন আউট
        </button>
      </section>

      
      <section className="card">
        <h2 className="profile__title">তথ্য আপডেট করুন</h2>
        <form onSubmit={handleUpdate}>
          <div className="field">
            <label htmlFor="name">নাম</label>
            <input
              id="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
            />
          </div>

          <button className="btn btn--block" disabled={saving || uploading}>
            {saving ? "অপেক্ষা করুন..." : "আপডেট"}
          </button>
        </form>
      </section>
    </div>
  );
}