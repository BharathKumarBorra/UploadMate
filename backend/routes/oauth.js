const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const passport = require("../oauth/passportConfig");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/oauth/status", async (req, res) => {
  const token = req.cookies.jwtToken; // Ensure this matches the cookie name used throughout

  if (!token) {
    return res.status(200).json({ authenticated: false }); // Explicitly send JSON response
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;
    const mdb = getDB(); // Access database instance here
    const getUserDetailsQuery = `SELECT * FROM users WHERE email = ?;`;
    const userDetailsObj = await mdb.get(getUserDetailsQuery, [email]);

    if (!userDetailsObj) {
      return res.status(200).json({ authenticated: false }); // Explicitly send JSON response
    }

    res.status(200).json({ authenticated: true }); // Explicitly send JSON response
  } catch (err) {
    res.status(200).json({ authenticated: false }); // Explicitly send JSON response
  }
});

// Redirect route after successful authentication
router.get(
  "/oauth/redirect",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    if (!req.user || !req.user.token) {
      return res.redirect(`${process.env.FRONTEND_URL}/login`);
    }

    const token = req.user.token;
    res.cookie("token", token, {
      secure: true,
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.redirect(`${process.env.FRONTEND_URL}`);
  }
);

// Google OAuth authentication route
router.get(
  "/oauth/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/youtube.upload",
      "https://www.googleapis.com/auth/youtubepartner",
      "https://www.googleapis.com/auth/youtube",
      "https://www.googleapis.com/auth/youtube.force-ssl",
    ],
    accessType: "offline",
    prompt: "consent select_account",
  })
);

router.get("/logout", (req, res) => {
  try {
    const token = req.cookies.token;

    res.cookie("token", token, {
      secure: true,
      sameSite: "None",
      maxAge: -1,
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An unexpected error occurred during logout" });
  }
});

module.exports = router;
