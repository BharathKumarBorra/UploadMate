const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
require("dotenv").config();

let mdb = null;

const initializeDB = async () => {
  try {
    // path.resolve ensures the correct path is used
    mdb = await open({
      filename: path.resolve(__dirname, "../youtubetimer.db"),
      driver: sqlite3.Database,
    });
  } catch (error) {
    process.exit(1);
  }
};

initializeDB();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.callbackURL,
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
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const email = profile.emails[0].value;
        const userImage = profile.photos[0].value;
        const userDisplayName = profile.displayName;

        const userCheckQuery = `SELECT * FROM users WHERE email=?;`;
        const userResponse = await mdb.get(userCheckQuery, email);

        if (!userResponse) {
          const maxIdQuery = `SELECT max(id) as maximum_id FROM users;`;
          const maxIdResponse = await mdb.get(maxIdQuery);
          const userName = `${profile.name.givenName}${
            (maxIdResponse.maximum_id || 0) + 1
          }`;
          const userInvitationCode = userName;

          const addUserQuery = `INSERT INTO users (username, email, invitation_code, refresh_token, user_image, user_display_name) VALUES (?, ?, ?, ?, ?, ?)`;
          await mdb.run(addUserQuery, [
            userName,
            email,
            userInvitationCode,
            refreshToken,
            userImage,
            userDisplayName,
          ]);
        } else {
          const updateRefreshTokenQuery = `UPDATE users SET refresh_token = ? WHERE email = ?`;
          await mdb.run(updateRefreshTokenQuery, [refreshToken, email]);
        }

        const user = { email };
        const token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        return cb(null, { token });
      } catch (err) {
        cb(err, null);
      }
    }
  )
);

module.exports = passport;
