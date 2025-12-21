"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/me/`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setDisplayName(data.display_name || "");
        setBio(data.bio || "");
        setLocation(data.location || "");
      });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("display_name", displayName);
    formData.append("bio", bio);
    formData.append("location", location);
    if (image) formData.append("profile_image", image);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/me/`, {
      method: "PATCH",
      credentials: "include",
      body: formData,
    });

    setLoading(false);
    router.push("/profile");
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-bold">Edit Profile</h1>

        {/* Profile Image */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="cursor-pointer"
        />

        <input
          placeholder="Display Name"
          className="w-full p-3 rounded bg-gray-800 cursor-text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <textarea
          placeholder="Bio"
          className="w-full p-3 rounded bg-gray-800 cursor-text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          placeholder="Location"
          className="w-full p-3 rounded bg-gray-800 cursor-text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-purple-600 py-3 rounded cursor-pointer hover:opacity-90"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
}
