import { connectDB } from "@/lib/mongoose";
import Complaint from "@/models/complaint";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();
  if (!Types.ObjectId.isValid(params.id))
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const complaint = await Complaint.findById(params.id).populate("postedBy", "fullName email");
  if (!complaint) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(complaint);
}

export async function PUT(req, { params }) {
  await connectDB();
  const updates = await req.json();
  const updated = await Complaint.findByIdAndUpdate(params.id, updates, { new: true });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const deleted = await Complaint.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ message: "Complaint deleted" });
}
