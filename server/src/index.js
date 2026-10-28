import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import Complaint from "./models/Complaint.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const makeId = customAlphabet("0123456789", 6);

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "2mb" }));

const categories = ["Roads", "Streetlights", "Drinking water", "Drainage & garbage",
  "School / health facilities", "Farmer services", "Government services", "Other"];
const statuses = ["Reported", "Follow-up needed", "In progress", "Resolved", "Reopened"];

app.get("/api/health", (_req, res) => res.json({ ok: true, project: "GramTrack Telangana" }));

app.get("/api/complaints", async (req, res) => {
  try {
    const filter = {};
    if (req.query.category && categories.includes(req.query.category)) filter.category = req.query.category;
    if (req.query.status && statuses.includes(req.query.status)) filter.status = req.query.status;
    const rows = await Complaint.find(filter).sort({ createdAt: -1 }).limit(200).lean();
    res.json(rows);
  } catch { res.status(500).json({ message: "Could not load complaints." }); }
});

app.get("/api/complaints/:trackingId", async (req, res) => {
  try {
    const row = await Complaint.findOne({ trackingId: req.params.trackingId }).lean();
    if (!row) return res.status(404).json({ message: "Tracking ID not found." });
    res.json(row);
  } catch { res.status(500).json({ message: "Could not load complaint." }); }
});

app.post("/api/complaints", async (req, res) => {
  try {
    const { title, description, category, landmark, language, photoDataUrl } = req.body || {};
    if (!title?.trim() || !description?.trim() || !landmark?.trim() || !categories.includes(category)) {
      return res.status(400).json({ message: "Title, description, category and landmark are required." });
    }
    const complaint = await Complaint.create({
      trackingId: `GT-${new Date().getFullYear()}-${makeId()}`,
      title: title.trim(), description: description.trim(), category, landmark: landmark.trim(),
      language: language === "en" ? "en" : "te",
      photoDataUrl: typeof photoDataUrl === "string" ? photoDataUrl.slice(0, 1500000) : "",
      status: "Reported",
      updates: [{ status: "Reported", note: "Report received in GramTrack. This is not an official government submission.", actor: "System" }]
    });
    res.status(201).json(complaint);
  } catch (err) {
    if (err?.code === 11000) return res.status(409).json({ message: "ID collision. Please submit again." });
    res.status(500).json({ message: "Could not save complaint. Check that MongoDB is running." });
  }
});

// Demo-only endpoint: add real authentication and role-based access before deployment.
app.patch("/api/complaints/:trackingId/status", async (req, res) => {
  try {
    const { status, note, officialReference } = req.body || {};
    if (!statuses.includes(status)) return res.status(400).json({ message: "Invalid status." });
    const row = await Complaint.findOne({ trackingId: req.params.trackingId });
    if (!row) return res.status(404).json({ message: "Tracking ID not found." });
    row.status = status;
    if (typeof officialReference === "string") row.officialReference = officialReference.trim().slice(0, 100);
    row.updates.push({
      status,
      note: String(note || "").trim().slice(0, 500),
      actor: "Demo administrator",
      createdAt: new Date()
    });
    await row.save();
    res.json(row);
  } catch { res.status(500).json({ message: "Could not update status." }); }
});

app.get("/api/stats", async (_req, res) => {
  try {
    const counts = await Complaint.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);
    const result = { total: 0, Reported: 0, "Follow-up needed": 0, "In progress": 0, Resolved: 0, Reopened: 0 };
    for (const item of counts) { result[item._id] = item.count; result.total += item.count; }
    res.json(result);
  } catch { res.status(500).json({ message: "Could not load stats." }); }
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/gramtrack")
  .then(() => {
    app.listen(port, () => console.log(`GramTrack API running at http://localhost:${port}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed. Start MongoDB and check MONGODB_URI.", err.message);
    process.exit(1);
  });
