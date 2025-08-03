import { connectDB } from "@/lib/mongoose";
import Admin from "@/models/admin";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();

  if (!Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const admin = await Admin.findById(params.id).select("-password");
  if (!admin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  return NextResponse.json(admin);
}

export async function PUT(req, { params }) {
  await connectDB();

  if (!Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const updates = await req.json();
  const updated = await Admin.findByIdAndUpdate(params.id, updates, { new: true }).select("-password");

  if (!updated) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();

  if (!Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const deleted = await Admin.findByIdAndDelete(params.id);
  if (!deleted) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Admin deleted successfully" });
}
