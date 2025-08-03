import { connectDB } from "@/lib/mongoose";
import Complaint from "@/models/complaint";
import { NextResponse } from "next/server";
// eslint-disable-next-line no-unused-vars
import User from "@/models/user";

export async function GET() {
  await connectDB();

  try {
    const complaints = await Complaint.find({}).populate("postedBy", "fullName email");
    return NextResponse.json(complaints);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();

  try {
    const saved = await Complaint.create(data);
    return NextResponse.json(saved);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
