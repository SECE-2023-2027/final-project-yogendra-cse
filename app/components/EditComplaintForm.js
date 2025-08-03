"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const EditComplaintForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    flatNumber: "",
    contactNumber: "",
    email: "",
    complaintType: "",
    complaintTitle: "",
    complaintDescription: "",
    dateOfIssue: "",
    priority: "Low",
    location: "",
    attachment: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/user/complaint/${id}`);
      const data = await res.json();
      setForm(data);
    };
    fetchData();

    if (!window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [id]);

  const uploadMedia = () => {
    const widget = window.cloudinary.createUploadWidget({
      cloudName: "drfp9vied",
      uploadPreset: "react-estate-appPreset",
      multiple: false,
    }, (err, result) => {
      if (!err && result.event === "success") {
        setForm(prev => ({ ...prev, attachment: result.info.secure_url }));
      }
    });
    widget.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/complaint/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Update failed");
      alert("Complaint updated!");
      router.push("/userDashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-neutral-900 min-h-screen pt-15">
    <div className="bg-[#1e1e1e] text-white p-6 max-w-3xl mx-auto rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Complaint</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["fullName","flatNumber","contactNumber","email","complaintTitle","location"].map(key => (
          <input key={key} type="text" placeholder={key.replace(/([A-Z])/g, " $1")} required={key !== "email" && key !== "location"}
            value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded" />
        ))}

        <select value={form.complaintType} required
          onChange={(e) => setForm({ ...form, complaintType: e.target.value })}
          className="w-full p-2 bg-gray-800 rounded">
          <option value="">Select Complaint Type</option>
          {["Water", "Electricity", "Security", "Cleanliness", "Noise"].map(type => (
            <option key={type}>{type}</option>
          ))}
        </select>

        <textarea rows={4} placeholder="Complaint Description" required
          value={form.complaintDescription}
          onChange={(e) => setForm({ ...form, complaintDescription: e.target.value })}
          className="w-full p-2 bg-gray-800 rounded" />

        <input type="date" value={form.dateOfIssue}
          onChange={(e) => setForm({ ...form, dateOfIssue: e.target.value })}
          className="w-full p-2 bg-gray-800 rounded" />

        <select value={form.priority} required
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          className="w-full p-2 bg-gray-800 rounded">
          <option>Low</option><option>Medium</option><option>High</option>
        </select>

        <div className="flex items-center gap-4">
          <button type="button" onClick={uploadMedia}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Upload Image/Video</button>
          {form.attachment && <span className="text-green-400">Uploaded ✅</span>}
        </div>

        <button type="submit" className="w-full bg-green-600 py-2 rounded hover:bg-green-700">
          Update Complaint
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditComplaintForm;
