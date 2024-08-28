const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const fs = require("fs");
const http = require("http");
const { v4: uuidv4 } = require("uuid");
const { getDB } = require("./db");

const ensureAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect(`${process.env.FRONTEND_URL}/login`);
  }

  try {
    const mdb = getDB();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;
    const getUserDetailsQuery = `SELECT * FROM users WHERE email = ?;`;
    const userDetailsObj = await mdb.get(getUserDetailsQuery, [email]);

    if (!userDetailsObj) {
      return res.redirect(`${process.env.FRONTEND_URL}/login`);
    }

    req.user = userDetailsObj;
    next();
  } catch (err) {
    res.redirect(`${process.env.FRONTEND_URL}/login`);
  }
};

const getNewAccessToken = async (refreshToken) => {
  const url = "https://oauth2.googleapis.com/token";
  const params = new URLSearchParams({
    client_id: process.env.clientID,
    client_secret: process.env.clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();

      return null;
    }

    const data = await response.json();

    return data.access_token;
  } catch (error) {
    return null;
  }
};

const downloadFromUrl = async (fileUrl, videoId, fileType) => {
  try {
    const uniqueFilename = `${videoId}_${uuidv4()}.${fileType}`;
    const filePath = `./videos/${uniqueFilename}`;

    if (!fs.existsSync("./videos")) {
      fs.mkdirSync("./videos");
    }

    const file = fs.createWriteStream(filePath);

    await new Promise((resolve, reject) => {
      http
        .get(fileUrl, (response) => {
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            resolve(filePath);
          });
        })
        .on("error", (err) => {
          fs.unlink(filePath, () => reject(err));
        });
    });

    return uniqueFilename;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  ensureAuthenticated,
  getNewAccessToken,
  downloadFromUrl,
};
