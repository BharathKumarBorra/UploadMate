const express = require("express");
const cookieParser = require("cookie-parser");
const { v2 } = require("cloudinary");
const passport = require("./oauth/passportConfig");
const cors = require("cors");
const path = require("path");

const { initializeDB } = require("./db");
require("dotenv").config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: [`${process.env.FRONTEND_URL}`],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(passport.initialize());

v2.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.apiKey,
  api_secret: process.env.apiSecret,
});

// Importing and use routes from the routes folder
const oauthRoutes = require("./routes/oauth");
const requestDetailsRoutes = require("./routes/requestDetails");
const requestModificationRoutes = require("./routes/requestModification");
const userDetailsRoutes = require("./routes/userDetails");

app.use(oauthRoutes);
app.use(requestDetailsRoutes);
app.use(requestModificationRoutes);
app.use(userDetailsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "frontend/build")));

// Catch-all handler to send the React app's index.html file for any unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

const initializeServer = async () => {
  try {
    await initializeDB();
    console.log("db initialized");
    app.listen(5000, () => {
      console.log("Server is running on http://localhost:5000");
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

initializeServer();
