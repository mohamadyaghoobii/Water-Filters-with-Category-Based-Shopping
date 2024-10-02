const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
const cookieParser = require('cookie-parser');

const app = express(); // Initialize app first

// Define allowed origins for CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL2,
  process.env.FRONTEND_URL3,
  process.env.FRONTEND_URL4,
];

console.log(process.env.FRONTEND_URL,
  process.env.FRONTEND_URL2,
  process.env.FRONTEND_URL3,
  process.env.FRONTEND_URL4);

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Ensure credentials are allowed if required
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Ensure the necessary methods are allowed
  allowedHeaders: ['Content-Type', 'Authorization'],  // Ensure necessary headers are allowed
  preflightContinue: false,  // Set to false to send a success response immediately
  optionsSuccessStatus: 204,  // Response status for preflight requests
};

// Use CORS before any routes or middleware that needs it
app.use(cors(corsOptions));

// Explicitly handle OPTIONS method for preflight requests
app.options('*', cors(corsOptions));

app.use(express.json()); // Parse incoming JSON
app.use(cookieParser()); // Parse cookies

// Use the router for your API routes
app.use("/api", router);

const PORT = 8080 || process.env.PORT

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log(`Server is running on port ${PORT}`);
  });
});
