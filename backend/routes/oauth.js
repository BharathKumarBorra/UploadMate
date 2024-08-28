const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const passport = require("../oauth/passportConfig");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/oauth/status", async (req, res) => {
  const token = req.cookies.token; // Get token from cookies
  console.log("backend cookies: ", req.cookies);

  console.log("token from cookies:", token);

  if (!token) {
    return res.send({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;
    const mdb = getDB(); // Access database instance here
    const getUserDetailsQuery = `SELECT * FROM users WHERE email = ?;`;
    const userDetailsObj = await mdb.get(getUserDetailsQuery, [email]);

    if (!userDetailsObj) {
      console.log("User not found");
      return res.send({ authenticated: false });
    }

    res.send({ authenticated: true });
  } catch (err) {
    console.error("Token verification failed:", err);
    res.send({ authenticated: false });
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

    return res.status(200).send("Successfully logged out");
  } catch (error) {
    return res.status(500).send("An unexpected error occurred during logout.");
  }
});

module.exports = router;
