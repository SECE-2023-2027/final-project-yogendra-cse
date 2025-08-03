"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const AdminProfile = () => {
  const router = useRouter();
  const [adminInfo, setAdminInfo] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const localData = localStorage.getItem("admin");
      const data_of_admin = JSON.parse(localData);
      setAdminInfo(data_of_admin);
      setLoading(false);
    };
    fetchProfile();
  }, []);
  const handleLogout = () => {
    try {
      localStorage.removeItem("admin");
      document.cookie = "token=; path=/; max-age=0";
      alert("Logged out successfully");
      setTimeout(() => {
        router.push("/login");
      }, 100); 
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  if (loading)
    return <div className="text-white text-center mt-10">Loading...</div>;


  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 p-10 rounded-2xl w-[700px] shadow-2xl shadow-gray-700/40">
        <h2 className="text-4xl font-bold mb-6 border-b border-gray-600 pb-3">
          Admin Profile
        </h2>
        <div className="space-y-4 text-lg">
          <p>
            <span className="text-gray-400">Full Name:</span>{" "}
            <span className="text-white">{adminInfo?.fullName}</span>
          </p>
          <p>
            <span className="text-gray-400">Email:</span>{" "}
            <span className="text-white">{adminInfo?.email}</span>
          </p>
        </div>
        <div className="flex justify-end items-center border-2xl mt-3"><button onClick={handleLogout} className="border-2 rounded-2xl flex items-center justify-center py-2 px-4 h-[36px] w-[90px] text-[16px]  text-shadow-blue-900 bg-blue-500 hover:bg-blue-600">logout</button></div>
      </div>
    </div>
  );
};

export default AdminProfile;
