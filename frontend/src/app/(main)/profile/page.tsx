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
  joined_date?: string;
  date_joined?: string;
  created_at?: string;
  total_orders: number;
  custom_uploads: number;
  reward_points: number;
  orders: Order[];
}

/* ================= COMPONENT ================= */

export default function ProfilePage() {
  const { user, token, logout } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ================= FETCH PROFILE ================= */

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/profiles/dashboard/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();

        console.log("PROFILE RESPONSE:", data);
        console.log("STATUS:", res.status);

        // 🔥 backend list OR object — dono handle
        const profileData = Array.isArray(data) ? data[0] : data;

        setProfile(profileData);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  /* ================= STATES ================= */

  if (!user) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <User className="w-12 h-12 mx-auto mb-4" />
          <p>Please login to view your profile.</p>
          <a
            href="/auth/login"
            className="mt-4 inline-block bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl text-white"
          >
            Go to Login
          </a>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white bg-black">
        <p className="text-lg">Loading profile...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center text-red-400 bg-black">
        <p>Error: {error}</p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>No profile data found.</p>
      </main>
    );
  }

  /* ================= SAFE DATE ================= */

  const joinedDate =
    profile.joined_date || profile.date_joined || profile.created_at || null;

  /* ================= UI ================= */

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4 py-8">
      <div className="max-w-5xl mt-24 mx-auto space-y-8">
        {/* ===== HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700/30"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl font-bold">
                {profile.name?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <h1 className="text-3xl font-bold">{profile.name} 👋</h1>

                <p className="text-gray-400 flex items-center space-x-2 mt-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Joined:{" "}
                    {joinedDate ? new Date(joinedDate).toDateString() : "—"}
                  </span>
                </p>

                <p className="text-gray-400 text-sm">{profile.email}</p>
              </div>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => router.push("/profile/edit")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 rounded-xl flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={logout}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-5 py-3 rounded-xl flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white`}
              >
                <Icon className="w-8 h-8 mb-3 opacity-80" />
                <div className="text-2xl font-bold">{stat.value ?? 0}</div>
                <div className="text-sm opacity-90">{stat.title}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ===== RECENT ORDERS ===== */}
        <section className="bg-gray-800/40 p-8 rounded-3xl border border-gray-700/30">
          <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>

          {!profile.orders || profile.orders.length === 0 ? (
            <p className="text-gray-400">No orders found.</p>
          ) : (
            <div className="space-y-4">
              {profile.orders.map((order) => (
                <motion.div
                  key={order.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Order #{order.id}</h3>
                      <p className="text-green-400 text-sm mt-1">
                        Status: {order.status}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-bold">
                        ₹{order.total_price}
                      </div>
                      <button className="text-purple-400 text-sm mt-1 flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>View Details</span>
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
