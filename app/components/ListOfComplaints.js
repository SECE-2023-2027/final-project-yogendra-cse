
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const UserDashboard = () => {
  const [myComplaints, setMyComplaints] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const fetchMyComplaints = async () => {
      const res = await fetch("/api/user/complaint");
      const all = await res.json();
      const filtered = all.filter((c) => c.postedBy._id === user._id);
      setMyComplaints(filtered);
    };

    fetchMyComplaints();
  }, []);

  return (
      <div className="bg-neutral-900 min-h-screen pt-15">
    <div className="bg-neutral-950 text-white p-6 max-w-6xl mx-auto rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Your Complaints</h1>
      <div className="grid gap-4 rounded-lg">
        {myComplaints.map((c) => (
          <div key={c._id} className="bg-gray-800 p-4 rounded shadow flex flex-col gap-[6px]">
            <Link href={`/userComplaintSinglepage/${c._id}`}>
            <h2 className="text-lg font-semibold">{c.complaintTitle}</h2>
            </Link>
            <p>{c.complaintDescription}</p>
            <p className="text-sm text-gray-400">Type: {c.complaintType}</p>
            <p className="text-sm">Priority: {c.priority} | Location: {c.location}</p>
            <p>Status: {c.resolved ? "🎉 Resolved - Congratulations!" : "Pending"}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default UserDashboard;