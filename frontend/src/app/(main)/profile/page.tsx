"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Package,
  Award,
  Star,
  Edit3,
  LogOut,
  Calendar,
  Eye,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

/* ================= TYPES ================= */

interface Order {
  id: number;
  status: string;
  total_price: number;
}

interface Profile {
  name: string;
  email: string;
  bio?: string;
  profile_image?: string;
  joined_date?: string;
  created_at?: string;
  total_orders: number;
  custom_uploads: number;
  reward_points: number;
  orders: Order[];
}

/* ================= COMPONENT ================= */

export default function ProfilePage() {
  const { user, logout, loading: authLoading } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ================= FETCH PROFILE ================= */

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/profiles/dashboard/",
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  /* ================= STATES ================= */

  if (authLoading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-gray-300">
        Loading...
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <User className="w-12 h-12 mx-auto opacity-60" />
          <p>Please login to view your profile.</p>
          <a
            href="/auth/login"
            className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 cursor-pointer"
          >
            Go to Login
          </a>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-gray-300">
        Loading profile...
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-red-400">
        {error}
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-gray-400">
        No profile data found.
      </main>
    );
  }

  const joinedDate = profile.joined_date || profile.created_at;

  /* ================= UI ================= */

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white mt-21 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-10 mt-20">

        {/* ===== PROFILE HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-6">

            {/* LEFT */}
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-2xl overflow-hidden flex items-center justify-center
                              bg-gradient-to-r from-purple-500 to-pink-500
                              text-4xl font-bold shadow-lg">
                {profile.profile_image ? (
                  <img
                    src={profile.profile_image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>
                    {(profile.name || profile.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}
              </div>

              {/* Info */}
              <div>
                <h1 className="text-3xl font-bold">
                  {profile.name} 👋
                </h1>

                {profile.bio && (
                  <p className="text-gray-300 mt-2 max-w-xl">
                    {profile.bio}
                  </p>
                )}

                <p className="text-gray-400 flex items-center gap-2 mt-3 text-sm">
                  <Calendar className="w-4 h-4" />
                  Joined {joinedDate && new Date(joinedDate).toDateString()}
                </p>

                <p className="text-gray-500 text-sm">{profile.email}</p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/profile/edit")}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500
                           flex items-center gap-2 cursor-pointer hover:scale-105 transition"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </button>

              <button
                onClick={logout}
                className="px-5 py-3 rounded-xl bg-red-500/20 text-red-400
                           cursor-pointer hover:bg-red-500/30 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              title: "Total Orders",
              value: profile.total_orders,
              icon: Package,
              color: "from-blue-500 to-cyan-500",
            },
            {
              title: "Custom Uploads",
              value: profile.custom_uploads,
              icon: Star,
              color: "from-yellow-500 to-orange-500",
            },
            {
              title: "Reward Points",
              value: profile.reward_points,
              icon: Award,
              color: "from-purple-500 to-indigo-500",
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-br ${stat.color}
                            p-6 rounded-2xl shadow-xl`}
              >
                <Icon className="w-8 h-8 mb-3 opacity-90" />
                <div className="text-3xl font-bold">{stat.value ?? 0}</div>
                <div className="text-sm opacity-90">{stat.title}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ===== ORDERS ===== */}
        <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>

          {!profile.orders?.length ? (
            <p className="text-gray-400">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {profile.orders.map(order => (
                <motion.div
                  key={order.id}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl bg-white/5 border border-white/10 p-6"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">
                        Order #{order.id}
                      </h3>
                      <p className="text-green-400 text-sm mt-1">
                        {order.status}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-bold">
                        ₹{order.total_price}
                      </div>
                      <button className="text-purple-400 text-sm mt-1 flex items-center gap-1 cursor-pointer">
                        <Eye className="w-3 h-3" />
                        View
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
