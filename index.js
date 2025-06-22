const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const userRoutes = require('./routes/user')
const app = express();
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(userRoutes);

// Connect to MongoDB
connectDB();

// Routes
app.use("/", authRoutes);
app.use("/api", questionRoutes)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port: ${PORT}`);
});

