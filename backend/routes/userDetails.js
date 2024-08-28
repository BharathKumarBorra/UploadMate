const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const { ensureAuthenticated } = require("../middleware");

router.get("/user/details", ensureAuthenticated, async (req, res) => {
  try {
    const query = `SELECT email, invitation_code, user_image, user_display_name FROM users WHERE email=?;`;
    const mdb = getDB(); // Access database instance here
    const dbResponse = await mdb.get(query, req.user.email);

    if (dbResponse) {
      res.json({
        invitationCode: dbResponse.invitation_code,
        userEmail: dbResponse.email,
        userImage: dbResponse.user_image,
        displayName: dbResponse.user_display_name,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
