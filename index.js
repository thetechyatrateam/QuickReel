const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://codeyogiai:8piooTDV93Lo1XK4@vudeo.wif4u8x.mongodb.net/videos?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

// Video Schema
const Video = mongoose.model("Video", {
  url: String,
  public_id: String,
  videoType: String, // Correct field name
  uploadedAt: { type: Date, default: Date.now },
});

// API to get videos (with optional filter by tag)
app.get("/videos", async (req, res) => {
  try {
    const tag = req.query.tag;
    let query = {};

    // Use correct field name: videoType
    if (tag && tag !== "ALL") {
      query.videoType = tag;
    }

    const videos = await Video.find(query).sort({ uploadedAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    res.status(500).json({ error: "❌ Failed to fetch videos" });
  }
});

// Serve frontend HTML
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start Server
app.listen(3000, function () {
  console.log("🚀 Server is running on port 3000");
});
