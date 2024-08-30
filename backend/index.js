const express = require("express");
const cookieParser = require("cookie-parser");
const { v2 } = require("cloudinary");
const passport = require("./oauth/passportConfig");
const cors = require("cors");

const { initializeDB } = require("./db");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: false }));

// CORS middleware to allow requests from the frontend
app.use(
  cors({
    origin: [`${process.env.FRONTEND_URL}`], // Allow requests from the specified frontend URL
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    credentials: true, // Include credentials (cookies) with requests
  })
);

// Initialize Passport.js for authentication
app.use(passport.initialize());

// Configure Cloudinary for media management
v2.config({
  cloud_name: process.env.cloudName, // Cloudinary cloud name
  api_key: process.env.apiKey, // Cloudinary API key
  api_secret: process.env.apiSecret, // Cloudinary API secret
});

// Import and use routes from the routes folder
const oauthRoutes = require("./routes/oauth");
const requestDetailsRoutes = require("./routes/requestDetails");
const requestModificationRoutes = require("./routes/requestModification");
const userDetailsRoutes = require("./routes/userDetails");

// Mount route handlers
app.use(oauthRoutes);
app.use(requestDetailsRoutes);
app.use(requestModificationRoutes);
app.use(userDetailsRoutes);

// Function to initialize the server and connect to the database
const initializeServer = async () => {
  try {
    await initializeDB(); // Initialize the database connection

    app.listen(5000, () => {
      console.log("Server is running on port 5000"); // Notify that the server is running
    });
  } catch (error) {
    process.exit(1); // Exit the process with a failure code
  }
};

// Start the server
initializeServer();
