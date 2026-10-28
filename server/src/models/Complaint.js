import mongoose from "mongoose";

const updateSchema = new mongoose.Schema({
  status: { type: String, required: true },
  note: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  actor: { type: String, default: "System" }
}, { _id: false });

const complaintSchema = new mongoose.Schema({
  trackingId: { type: String, unique: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  category: { type: String, required: true, enum: [
    "Roads", "Streetlights", "Drinking water", "Drainage & garbage",
    "School / health facilities", "Farmer services", "Government services", "Other"
  ]},
  landmark: { type: String, required: true, trim: true, maxlength: 250 },
  language: { type: String, enum: ["en", "te"], default: "te" },
  photoDataUrl: { type: String, default: "", maxlength: 1500000 },
  officialReference: { type: String, default: "", maxlength: 100 },
  status: { type: String, enum: ["Reported", "Follow-up needed", "In progress", "Resolved", "Reopened"], default: "Reported" },
  updates: { type: [updateSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

complaintSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("Complaint", complaintSchema);
