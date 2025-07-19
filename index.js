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

app.get("/", function (req, res){
  res.sendfile(path.join(__dirname, "index.html"));
});


app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
