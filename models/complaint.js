import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const complaintSchema = new Schema({
  fullName: { type: String, required: true },
  flatNumber: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String },
  complaintType: { type: String, required: true },
  complaintTitle: { type: String, required: true },
  complaintDescription: { type: String, required: true },
  dateOfIssue: { type: Date },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
  attachment: { type: String },
  location: { type: String },
  resolved: { type: Boolean, default: false },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const Complaint = models.Complaint || model("Complaint", complaintSchema);
export default Complaint;