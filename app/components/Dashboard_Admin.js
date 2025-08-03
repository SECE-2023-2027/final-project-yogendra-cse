"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
    const [allComplaints, setAllComplaints] = useState([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await fetch("/api/user/complaint");
                const data = await res.json();
                console.log("sfasf", data)
                setAllComplaints(data);
            } catch (err) {
                console.error("Failed to fetch complaints", err);
            }
        };

        fetchComplaints();
    }, []);

    return (
        <div className="bg-neutral-900 min-h-screen pt-15">
            <div className="bg-neutral-950 text-white p-6 max-w-6xl mx-auto rounded-lg">
                <h1 className="text-2xl font-bold mb-6">All Complaints (Admin View)</h1>
                <div className="grid gap-4">
                    {
                        allComplaints.map((c) => (    
                            <div key={c._id} className="bg-gray-800 p-4 rounded shadow flex flex-col gap-[6px]">
                                <Link href={`/complaint/${c._id}`}>
                                    <h2 className="text-lg font-semibold">{c.complaintTitle}</h2>
                                </Link>
                                <p>{c.complaintDescription}</p>
                                <p className="text-sm text-gray-400">Type: {c.complaintType}</p>
                                <p className="text-sm">Priority: {c.priority} | Location: {c.location}</p>
                                <p className="text-sm text-yellow-200">
                                    Posted By: {c.postedBy?.fullName || "Unknown"} ({c.postedBy?.email || "N/A"})
                                </p>
                                <p>Status: {c.resolved ? "🎉 Resolved - Congratulations!" : "❗ Pending"}</p>
                            
                            </div>
                        )
                        )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
