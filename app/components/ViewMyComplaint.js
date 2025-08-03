"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const viewMyComplaint = () => {
  const { id } = useParams();
  const router = useRouter();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      const res = await fetch(`/api/user/complaint/${id}`);
      const data = await res.json();
      setComplaint(data);
    };
    fetchComplaint();
  }, [id]);

  const deleteComplaint = async () => {
    await fetch(`/api/user/complaint/${id}`, { method: "DELETE" });
    alert("Complaint deleted");
    router.push("/userDashboard");
  };

  const handleEdit = () => {
    router.push(`/editComplaint/${id}`);
  };

  if (!complaint) return <p className="text-white">Loading...</p>;

return (
  <div className="min-h-screen w-full bg-[#2a2a2a] flex justify-center items-start py-12 px-4">
    <div className="bg-[#1e1e1e] text-white w-full max-w-3xl p-6 rounded-2xl shadow-md border border-gray-700">
      <h1 className="text-2xl font-bold mb-4">Your Complaint</h1>
      <div className="space-y-3">
        <p><strong>Name:</strong> {complaint.fullName}</p>
        <p><strong>Flat No:</strong> {complaint.flatNumber}</p>
        <p><strong>Contact:</strong> {complaint.contactNumber}</p>
        <p><strong>Email:</strong> {complaint.email || "N/A"}</p>
        <p><strong>Title:</strong> {complaint.complaintTitle}</p>
        <p><strong>Description:</strong> {complaint.complaintDescription}</p>
        <p><strong>Type:</strong> {complaint.complaintType}</p>
        <p><strong>Date of Issue:</strong> {complaint.dateOfIssue}</p>
        <p><strong>Priority:</strong> {complaint.priority}</p>
        <p><strong>Location:</strong> {complaint.location || "N/A"}</p>
        <p><strong>Status:</strong> {complaint.resolved ? "✅ Resolved — Congratulations!" : "❌ Still Pending"}</p>

        {complaint.attachment && (
          <div className="mt-4">
            <strong>Attachment:</strong><br />
            {complaint.attachment.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
              <img
                src={complaint.attachment}
                alt="Attachment"
                className="max-w-full mt-2 rounded"
              />
            ) : complaint.attachment.match(/\.(mp4|webm|ogg)$/i) ? (
              <video
                src={complaint.attachment}
                controls
                className="max-w-full mt-2 rounded"
              />
            ) : (
              <p className="text-gray-400 mt-2">Unsupported file type</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleEdit}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={deleteComplaint}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);



};

export default viewMyComplaint;
