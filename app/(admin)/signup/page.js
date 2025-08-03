"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AdminSignup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminKey: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, password, confirmPassword, adminKey } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (adminKey.trim() !== "society-master") {
      alert("Invalid Admin Key");
      return;
    }

    try {
      const res = await fetch("/api/auth/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }
      

      alert("Admin account created!");
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600" required />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600" required />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600" required />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600" required />
          <input name="adminKey" type="text" placeholder="Enter Admin Key" value={formData.adminKey} onChange={handleChange} className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600" required />

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-medium">
            Sign Up as Admin
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-400">
          Already an admin?{" "}
          <span onClick={() => router.push("/login")} className="text-blue-400 cursor-pointer hover:underline">
            Login here
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
