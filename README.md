# GramTrack Telangana — College Project MVP

A bilingual (Telugu + English) village issue tracking website for N. Annaram, Penpahad mandal, Suryapet district, Telangana.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Features
- Telugu / English language toggle
- Report road, streetlight, drinking-water, drainage, school/health, farmer-service, and other issues
- Create a local tracking ID (GT-YYYY-XXXXXX)
- Upload a photo (optional; stored as a data URL in this MVP)
- List reports and filter by category/status
- Track status history and follow-up notes
- Basic admin status update form (demo; secure authentication is not included yet)
- Public dashboard counts

## Requirements
Install Node.js 20+ and have MongoDB running locally or use a MongoDB Atlas connection string.

## Run locally

### 1. Backend
```bash
cd server
cp .env.example .env
# Edit .env if needed. Default is mongodb://127.0.0.1:27017/gramtrack
npm install
npm run dev
```

### 2. Frontend (new terminal)
```bash
cd client
npm install
npm run dev
```
Open the Vite URL shown in the terminal (usually http://localhost:5173).

## Important notes
- This is a college-project MVP, not an official government service.
- It does not submit complaints to government portals automatically and has no official partnership.
- The local ID (e.g. GT-2026-000001) is NOT a government complaint number.
- Before public deployment, add authentication/role-based access, rate limiting, validation, secure file storage, consent and privacy controls, backups, and HTTPS.
- Do not publish citizens' personal details or unverified allegations.
- Verify local office contact details before adding them to a live public directory.
