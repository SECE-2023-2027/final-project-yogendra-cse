import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect("mongodb+srv://rodgeryogendra:test1234@mongocluster.lpblm.mongodb.net/social-complaint-log");
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
