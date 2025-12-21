"use client";
import { use, useState } from "react";

export default function ResetPasswordPage({
  params,
}: {
  params: Promise<{ uid: string; token: string }>;
}) {
  const { uid, token } = use(params);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${uid}/${token}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password,
            password2: confirmPassword,
          }),
          credentials: "include",
        }
      );

      if (res.ok) {
        setSuccess("Password reset successfully!");
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 1500);
      } else {
        const data = await res.json();
        setError(data.token || data.password || "Failed to reset password");
      }
    } catch {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0b0b0f] flex items-center justify-center">
      {/* BLUE BLOB */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-blue-500/60 rounded-full blur-[140px]" />

      {/* ORANGE BLOB */}
      <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] bg-orange-500/60 rounded-full blur-[140px]" />

      {/* GLASS CARD */}
      <div
        className="relative z-10 w-[420px] rounded-2xl border border-white/10
                   bg-white/10 backdrop-blur-xl p-8
                   shadow-[0_0_50px_rgba(0,0,0,0.6)] text-white"
      >
        <h2 className="text-3xl font-bold">Reset Password</h2>
        <p className="text-sm text-gray-300 mt-1">
          Set a new password for your account
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}
          {success && <p className="text-green-400 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-white text-black py-3 font-semibold
                       hover:bg-gray-200 transition"
          >
            Reset Password
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-300">
          Remembered your password?{" "}
          <a href="/auth/login" className="text-white underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

function Input({ label, type = "text", placeholder, value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full rounded-lg bg-white/10 border border-white/10
                   px-4 py-2.5 text-white placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-white/20"
      />
    </div>
  );
}
