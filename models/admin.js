import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const adminSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Admin = models.Admin || model("Admin", adminSchema);

export default Admin;
