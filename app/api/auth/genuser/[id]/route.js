import { connectDB } from "@/lib/mongoose";
import User from "@/models/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();

  if (!Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const user = await User.findById(params.id);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();

  const user = await User.findByIdAndUpdate(params.id, data, { new: true });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function DELETE(req, { params }) {
  await connectDB();

  const user = await User.findByIdAndDelete(params.id);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ message: "User deleted" });
}
