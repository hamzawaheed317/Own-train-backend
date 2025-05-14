require("dotenv").config();
const errorHandler = require("../middlewares/errorHandler");
const connectToMongoDbCluster = require("../utils/db");
const adminRoutes = require("../routes/adminRoutes");
const userRoutes = require("../routes/userRoutes");
const express = require("express");
const cors = require('cors');

const app = express();
const feedbackRoutes = require("../routes/FeedbackRoutes");

connectToMongoDbCluster();

// Add this before any routes
app.use(cors({
   origin: process.env.FRONTEND_URL, // Replace with your frontend URL
  credentials: true // if you're using cookies or auth headers
}));
// Default middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/feedback", feedbackRoutes);

// Auth middleware and error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

