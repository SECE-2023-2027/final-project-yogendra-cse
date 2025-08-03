"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const UserProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = () => {
      const localStorageData = localStorage.getItem("user");
      if (localStorageData) {
        try {
          const data_of_user = JSON.parse(localStorageData);
          setUser(data_of_user);
        } catch (err) {
          console.error("Failed to parse user data:", err);
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading)
    return <div className="text-white text-center mt-10">Loading...</div>;

  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
      document.cookie = "token=; path=/; max-age=0";
      alert("Logged out sucessfully")
      setUser(false);
      router.push("/userLogin");
    } catch (error) {
      console.log("Error");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-[700px]">
        <h2 className="text-3xl font-bold mb-6 border-b border-gray-600 pb-3">
          User Profile
        </h2>
        <div className="space-y-4 text-lg">
          <p><span className="text-gray-400">Full Name:</span> {user?.fullName}</p>
          <p><span className="text-gray-400">Email:</span> {user?.email}</p>
          <p><span className="text-gray-400">Phone:</span> {user?.phone}</p>
          <p><span className="text-gray-400">Flat Number:</span> {user?.flatNumber}</p>
        </div>
        <div className="flex justify-center items-center border-2xl"><button onClick={handleLogout} className="border-2 rounded-2xl flex items-center justify-center py-2 px-4 h-[36px] w-[90px] text-[16px]  text-shadow-blue-900 bg-blue-500 hover:bg-blue-600">logout</button></div>
      </div>

    </div>
  );
};

export default UserProfile;
