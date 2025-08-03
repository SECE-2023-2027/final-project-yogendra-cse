"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const UserSignup = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    flatNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const { fullName, email, password, phone, flatNumber,confirmPassword } = formData;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    

    try {
      const res = await fetch("/api/auth/genuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password,phone,flatNumber }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }
      
      alert("User account created!");
      router.push("/userLogin");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };
   

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">User Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600"
          />

          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600"
          />

          <input
            name="flatNumber"
            type="text"
            placeholder="Flat Number (e.g., A-101)"
            value={formData.flatNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-medium"
          >
            Sign Up as User
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-400">
          Already a user?{" "}
          <span
            onClick={() => router.push("/userLogin")}
            className="text-green-400 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
