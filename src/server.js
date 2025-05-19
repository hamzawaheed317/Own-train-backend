require("dotenv").config();
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser'); // ✅ Added
const errorHandler = require("../middlewares/errorHandler");
const connectToMongoDbCluster = require("../utils/db");

const adminRoutes = require("../routes/adminRoutes");
const userRoutes = require("../routes/userRoutes");
const feedbackRoutes = require("../routes/FeedbackRoutes");

const app = express();

connectToMongoDbCluster();

// ✅ Middleware setup
app.use(cors({
  origin: "https://www.owntrain.co",
  credentials: true
}));
app.use(cookieParser()); // ✅ Cookie parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/feedback", feedbackRoutes);

// ✅ Error handler
app.use(errorHandler);

// ✅ Server start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// ✅ Error safety
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

