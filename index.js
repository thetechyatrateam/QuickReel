const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

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

// 🟢 Video Schema
const Video = mongoose.model('Video', {
  url: String,
  public_id: String,
  tag: String, // Add tag field
  uploadedAt: { type: Date, default: Date.now },
});

app.get('/videos', async (req, res) => {
  try {
    const tag = req.query.tag;
    let query = {};
    
    // If tag is specified and not "ALL", filter by tag
    if (tag && tag !== 'ALL') {
      query.tag = tag;
    }
    
    const videos = await Video.find(query).sort({ uploadedAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: '❌ Failed to fetch videos' });
  }
});


app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
