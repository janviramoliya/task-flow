import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/taskflow";

async function connectDB() {
  try {
    // mongoose settings recommended for modern drivers
    await mongoose.connect(MONGO_URI, {
      // useNewUrlParser, useUnifiedTopology are defaulted in mongoose 6+
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

app.get("/", (req, res) => {
  res.json({ text: "Hello" });
});

// start server after DB connection (safer for apps that rely on DB at boot)
connectDB()
  .then(() => {
    app
      .listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      })
      .on("error", (err) => {
        console.log("Server error: ", err);
      });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
