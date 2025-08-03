import { connectDB } from "@/lib/mongoose";
import Admin from "@/models/admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const { fullName, email, password } = await req.json();

  const existing = await Admin.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const admin = await Admin.create({ fullName, email, password: hashed });

  return NextResponse.json({ message: "Admin created successfully", admin });
}

export async function PUT(req) {
  await connectDB();
  const { email, password } = await req.json();

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({
    message: "Login successful",
    admin: {
      _id: admin._id,
      email: admin.email,
      fullName: admin.fullName,
    },
  });
}
