import { connectDB } from "@/lib/mongoose";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const { fullName, email, password, phone, flatNumber } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) return NextResponse.json({ error: "Email already used" }, { status: 409 });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ fullName, email, password: hashed, phone, flatNumber });

  return NextResponse.json({ message: "User created", user });
}

export async function PUT(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  return NextResponse.json({ message: "Login success", user });
}
