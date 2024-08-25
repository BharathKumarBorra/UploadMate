const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const multer = require("multer");
const { v2 } = require("cloudinary");
const fs = require("fs");
const http = require("http");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
// const ejs = require("ejs");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cors = require("cors");
const FormData = require("form-data");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cookieParser()); // Middleware to parse cookies

app.use(express.json()); // Middleware to parse JSON payloads
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded payloads

// app.set("trust proxy", true);

//cors configuration
app.use(
  cors({
    origin: [`${process.env.FRONTEND_URL}`],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Initialize Passport
app.use(passport.initialize());

// Configuring Google OAuth 2.0 Strategy for Passport
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

// Redirect route after successful authentication
app.get(
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
app.get(
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

// Configuring Cloudinary for file uploads
v2.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.apiKey,
  api_secret: process.env.apiSecret,
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

/*...................... Initializing SQLite database and starting server .............. */

const dbPath = path.join(__dirname, "youtubetimer.db");
let mdb = null;
const initializeDBAndServer = async () => {
  try {
    mdb = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(5000, () => {
      console.log("Server is running on http://localhost:5000");
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

const ensureAuthenticated = async (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies
  console.log("backend cookies: ", req.cookies);

  console.log("token from cookies:", token);

  if (!token) {
    return res.redirect(`${process.env.FRONTEND_URL}/login`);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;
    const getUserDetailsQuery = `SELECT * FROM users WHERE email = ?;`;
    const userDetailsObj = await mdb.get(getUserDetailsQuery, [email]);

    if (!userDetailsObj) {
      console.log("User not found");
      return res.redirect(`${process.env.FRONTEND_URL}/login`);
    }

    req.user = userDetailsObj; // Attach user information to request
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.redirect(`${process.env.FRONTEND_URL}/login`);
  }
};

// Function to get new access token using refresh token
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
      console.error("Error refreshing access token:", errorData);
      return null; // Returning null on error
    }

    const data = await response.json();
    console.log("New access token:", data.access_token);

    return data.access_token; // Returning new access token
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null; // Returning null on error
  }
};

/*...................... CRUD Operations ................................. */

app.get("/oauth/status", async (req, res) => {
  const token = req.cookies.token; // Get token from cookies
  console.log("backend cookies: ", req.cookies);

  console.log("token from cookies:", token);

  if (!token) {
    return res.send({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;
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

app.get("/user/details", ensureAuthenticated, async (req, res) => {
  try {
    console.log("User email:", req.user.email);
    const query = `SELECT email, invitation_code, user_image, user_display_name FROM users WHERE email=?;`;
    const dbResponse = await mdb.get(query, req.user.email);
    console.log("dbResponse:", dbResponse);

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
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Request video upload
app.post(
  "/upload-request",
  ensureAuthenticated,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (request, response) => {
    try {
      const {
        title,
        description,
        privacy_status: privacyStatus,
        creator_invitation_code: creatorInvitationCode,
        audience,
        category_id: categoryId,
      } = request.body;

      // Fetch creator username from database
      const creatorUserNameQuery = `SELECT username FROM USERS WHERE invitation_code=?;`;
      const creatorUserNameResponse = await mdb.get(creatorUserNameQuery, [
        creatorInvitationCode,
      ]);
      if (!creatorUserNameResponse) {
        return response
          .status(400)
          .send({ message: "Invalid invitation code" });
      }
      const creatorUserName = creatorUserNameResponse.username;

      // Upload thumbnail to Cloudinary
      const thumbnailPath = request.files["thumbnail"][0].path;
      const thumbnailUploadResponse = await v2.uploader.upload(thumbnailPath, {
        resource_type: "image",
      });
      fs.unlinkSync(thumbnailPath); // Delete thumbnail from local storage

      // Upload video to Cloudinary
      const videoPath = request.files["video"][0].path;
      const videoUploadResponse = await v2.uploader.upload(videoPath, {
        resource_type: "video",
      });
      fs.unlinkSync(videoPath); // Delete video from local storage

      // Insert video details into the database
      const addDetailsQuery = `
        INSERT INTO VIDEOS(video_url, title, description, thumbnail_url, audience, category_id,
                            privacy_status, request_status, from_user, to_user, video_public_id, thumbnail_public_id) 
        VALUES(?, ?, ?, ?, ?, ?, ?,'pending', ?, ?, ?, ?);
      `;
      await mdb.run(addDetailsQuery, [
        videoUploadResponse.url,
        title,
        description,
        thumbnailUploadResponse.url,
        audience,
        categoryId,
        privacyStatus,
        request.user.username,
        creatorUserName,
        videoUploadResponse.public_id,
        thumbnailUploadResponse.public_id,
      ]);

      return response.status(200).send({ message: "Upload successful" });
    } catch (error) {
      console.error("Error during upload:", error);
      return response
        .status(500)
        .send({ message: "Upload failed", error: error.message });
    }
  }
);

// Get requests
app.get("/requests", ensureAuthenticated, async (request, response) => {
  try {
    const userName = request.user.username;
    console.log(userName);

    const { role, req_status } = request.query;
    let requestType;
    if (role === "creator") {
      requestType = "to_user";
    } else if (role === "editor") {
      requestType = "from_user";
    } else {
      return response.status(400).send("Invalid role parameter");
    }

    // Base query
    let getRequestsQuery = `SELECT * FROM VIDEOS WHERE ${requestType} = ?`;

    // Add status filter if req_status is provided
    if (req_status) {
      getRequestsQuery += ` AND request_status = ?`;
    }

    // Add order by clause to sort by requested_date_time in descending order
    getRequestsQuery += ` ORDER BY requested_date_time DESC`;

    const requestsResponse = req_status
      ? await mdb.all(getRequestsQuery, [userName, req_status])
      : await mdb.all(getRequestsQuery, [userName]);

    for (let eachItem of requestsResponse) {
      if (
        eachItem.video_upload_status === "not uploaded" &&
        eachItem.request_status === "approved"
      ) {
        const newAccessToken = await getNewAccessToken(
          eachItem.video_refresh_token
        );
        if (!newAccessToken) {
          const updateResponseDateTimeQuery = `
            UPDATE videos SET response_date_time=NULL WHERE id=?
          `;
          await mdb.run(updateResponseDateTimeQuery, [eachItem.id]);
          eachItem.response_date_time = null;
        }
      }
    }

    response.status(200).json(requestsResponse);
  } catch (error) {
    console.error("Error retrieving requests:", error);
    response.status(500).send("Error retrieving requests");
  }
});

// Get video details by videoId
app.get(
  "/requests/:videoId",
  ensureAuthenticated,
  async (request, response) => {
    try {
      const { videoId } = request.params;
      console.log("request params", request.params);

      const getRequestDetailsQuery = `SELECT * FROM VIDEOS WHERE id = ?;`;
      const dbResponse = await mdb.get(getRequestDetailsQuery, [videoId]);
      console.log(dbResponse);
      if (dbResponse === undefined) {
        return response.status(404).send({ message: "details not found" });
      }

      return response.status(200).json(dbResponse);
    } catch (error) {
      console.error("Error retrieving video details:", error);
      return response.status(500).send("Error retrieving video details");
    }
  }
);

// Update request status and refresh token
app.put(
  "/response/:videoId",
  ensureAuthenticated,
  async (request, response) => {
    const { videoId } = request.params;
    const { creatorResponse } = request.body;
    console.log(
      "for approving request refreshToken: ",
      request.user.refresh_token
    );

    let editorRequestStatus;

    if (creatorResponse) {
      editorRequestStatus = "approved";
    } else {
      editorRequestStatus = "rejected";
    }

    try {
      let updateRequestStatusQuery;
      let queryParams;
      const dateTime = new Date().toISOString();

      if (editorRequestStatus === "approved") {
        updateRequestStatusQuery = `
          UPDATE videos 
          SET request_status = ?, response_date_time=?, video_refresh_token = ? 
          WHERE id = ?;
        `;
        queryParams = [
          editorRequestStatus,
          dateTime,
          request.user.refresh_token,
          videoId,
        ];
      } else {
        updateRequestStatusQuery = `
          UPDATE videos 
          SET request_status = ?, response_date_time=? 
          WHERE id = ?;
        `;
        queryParams = [editorRequestStatus, dateTime, videoId];
      }

      const dbResponse = await mdb.run(updateRequestStatusQuery, queryParams);
      response.send(dbResponse);
    } catch (error) {
      console.error("Error updating request status:", error);
      response.status(500).send("Error updating request status");
    }
  }
);

// Resend request for approval due to expired refresh token
app.get("/resend/:videoId", ensureAuthenticated, async (request, response) => {
  const { videoId } = request.params;

  try {
    const updateResponseStatusQuery = `
      UPDATE videos
      SET request_status = 'pending'
      WHERE id = ?;
    `;

    const dbResponse = await mdb.run(updateResponseStatusQuery, [videoId]);

    if (dbResponse.changes > 0) {
      response.status(200).json({
        status: "success",
        message: "Request status updated successfully",
      });
    } else {
      response.status(400).json({
        status: "failure",
        message: "Failed to update request status",
      });
    }
  } catch (error) {
    console.error("Error in resending:", error);
    response
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
});

// Function to delete resource from Cloudinary
const deleteFromCloudinary = async (
  videoId,
  publicId,
  resourceType = "image"
) => {
  const columnName =
    resourceType === "image" ? "thumbnail_public_id" : "video_public_id";
  const addToPendingDeletesTableQuery = `
    INSERT INTO pending_deletes(${columnName}, video_id)
    VALUES(?, ?);
  `;

  try {
    // Starting the transaction
    await mdb.run("BEGIN TRANSACTION;");

    // Adding publicId to pending_deletes table
    await mdb.run(addToPendingDeletesTableQuery, [publicId, videoId]);

    // Deleting resource from Cloudinary
    await v2.uploader.destroy(publicId, { resource_type: resourceType });

    // Removing entry from pending_deletes table
    const removeFromPendingDeletesTableQuery = `
      DELETE FROM pending_deletes WHERE ${columnName} = ? AND video_id = ?;
    `;
    await mdb.run(removeFromPendingDeletesTableQuery, [publicId, videoId]);

    // Committing transaction
    await mdb.run("COMMIT;");
  } catch (error) {
    // Rollback transaction on error
    await mdb.run("ROLLBACK;");
    console.error(`Error deleting ${resourceType} from Cloudinary:`, error);
    // For handling error manually if any error occurs
  }
};

//delete the request
app.delete(
  "/delete/:videoId",
  ensureAuthenticated,
  async (request, response) => {
    const { videoId } = request.params;

    const getDetailsQuery = `
    SELECT video_public_id,thumbnail_public_id from videos WHERE id=?
    `;

    const deleteRequest = `
        DELETE FROM videos WHERE id=?;
    `;

    try {
      const getResponse = await mdb.get(getDetailsQuery, [videoId]);

      if (!getResponse) {
        return response.status(404).json({ error: "Video not found" });
      }

      await deleteFromCloudinary(videoId, getResponse.video_public_id, "video");
      await deleteFromCloudinary(videoId, getResponse.thumbnail_public_id);

      const deleteResponse = await mdb.run(deleteRequest, [videoId]);
      response.json({ message: "Video deleted successfully", deleteResponse });
    } catch (error) {
      console.error("Error deleting video:", error);
      response
        .status(500)
        .json({ error: "Failed to delete video. Please try again." });
    }
  }
);

// Function to download files from URLs
const downloadFromUrl = async (fileUrl, videoId, fileType) => {
  try {
    const uniqueFilename = `${videoId}_${uuidv4()}.${fileType}`;
    const filePath = `./videos/${uniqueFilename}`;

    // Ensure the 'videos' directory exists
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
          fs.unlink(filePath, () => reject(err)); // Deleting the file if error occurs
        });
    });

    return uniqueFilename;
  } catch (error) {
    console.error("Download failed:", error);
    throw error;
  }
};

// Route to upload video
app.post("/upload-video", ensureAuthenticated, async (req, res) => {
  const { videoId } = req.body;

  console.log("video id is :", videoId);

  const getVideoDetails = `SELECT * FROM videos WHERE id=?;`;
  const getVideoDetailsResponse = await mdb.get(getVideoDetails, [videoId]);

  const {
    video_url,
    title,
    description,
    thumbnail_url,
    category_id,
    audience,
    privacy_status,
    video_refresh_token,
    video_public_id,
    thumbnail_public_id,
  } = getVideoDetailsResponse;

  console.log("title, description:", title, description);
  console.log(
    "this is the refreshToken while uploading video: ",
    video_refresh_token
  );

  const newAccessToken = await getNewAccessToken(video_refresh_token);
  let isVideoUploaded = false;

  const cleanupFiles = (videoFileName, thumbnailFileName) => {
    if (videoFileName) {
      fs.unlink(`./videos/${videoFileName}`, (unlinkError) => {
        if (unlinkError) {
          console.error("Error deleting video file:", unlinkError);
        }
      });
    }
    if (thumbnailFileName) {
      fs.unlink(`./videos/${thumbnailFileName}`, (unlinkError) => {
        if (unlinkError) {
          console.error("Error deleting thumbnail file:", unlinkError);
        }
      });
    }
  };

  try {
    // Download video and thumbnail to local storage
    const videoFileName = await downloadFromUrl(video_url, videoId, "mp4");
    const thumbnailFileName = await downloadFromUrl(
      thumbnail_url,
      videoId,
      "jpg"
    );

    // Create a FormData instance for the video
    const videoForm = new FormData();
    videoForm.append(
      "resource",
      JSON.stringify({
        snippet: {
          title: title,
          description: description,
          categoryId: category_id,
        },
        status: {
          privacyStatus: privacy_status,
          selfDeclaredMadeForKids: audience === "yes",
        },
      }),
      { contentType: "application/json" }
    );
    videoForm.append(
      "media",
      fs.createReadStream(`./videos/${videoFileName}`),
      {
        filename: path.basename(videoFileName),
        contentType: "video/mp4",
      }
    );

    // Make the request to upload video to YouTube
    const videoResponse = await fetch(
      "https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
        body: videoForm,
      }
    );

    if (!videoResponse.ok) {
      const errorBody = await videoResponse.text();
      const errorObj = JSON.parse(errorBody);
      console.error("Error uploading video:", errorObj);
      cleanupFiles(videoFileName, thumbnailFileName);

      if (errorObj.error.code === 403) {
        if (errorObj.error.errors[0].reason === "quotaExceeded") {
          return res.status(403).json({
            reason: "video quotaExceeded",
            message:
              "Apologies! Our application has reached its quota for today. Please consider trying the upload again tomorrow. Thank you for your understanding!",
          });
        }
        return res.status(403).json({
          reason: "video upload forbidden",
          message: "The user does not have permission to upload video",
        });
      }
      return res.status(500).json({ message: "Failed to upload video" });
    }

    const videoResponseBody = await videoResponse.json();
    const youtubeVideoId = videoResponseBody.id;
    console.log("Response from YouTube:", videoResponseBody);
    isVideoUploaded = true;
    cleanupFiles(videoFileName, null);

    // Upload thumbnail
    const thumbnailForm = new FormData();
    thumbnailForm.append(
      "media",
      fs.createReadStream(`./videos/${thumbnailFileName}`),
      {
        filename: path.basename(thumbnailFileName),
        contentType: "image/jpeg",
      }
    );

    const thumbnailResponse = await fetch(
      `https://www.googleapis.com/upload/youtube/v3/thumbnails/set?videoId=${youtubeVideoId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
        body: thumbnailForm,
      }
    );

    if (!thumbnailResponse.ok) {
      const errorBody = await thumbnailResponse.text();
      const errorObj = JSON.parse(errorBody);
      console.error("Error uploading thumbnail:", errorObj);
      cleanupFiles(null, thumbnailFileName);

      if (errorObj.error.code === 403) {
        if (errorObj.error.errors[0].reason === "quotaExceeded") {
          return res.status(403).json({
            reason: "thumbnail quotaExceeded",
            message:
              "Apologies! Our application has reached its quota for today. For that reason, we couldn't upload the thumbnail. Thank you for your understanding!",
          });
        }
        return res.status(403).json({
          reason: "thumbnail upload forbidden",
          message: "The user does not have permission to upload thumbnails.",
        });
      } else {
        return res.status(409).json({
          message:
            "Video uploaded successfully. But, error while uploading thumbnail.",
        });
      }
    }

    const thumbnailResponseBody = await thumbnailResponse.json();
    console.log("Thumbnail uploaded successfully:", thumbnailResponseBody);
    cleanupFiles(null, thumbnailFileName);

    // Delete resources from Cloudinary
    await deleteFromCloudinary(videoId, video_public_id, "video");
    await deleteFromCloudinary(videoId, thumbnail_public_id, "image");
    console.log("successfully deleted from cloudinary");

    // Update the video and thumbnail URLs in the database
    const updateVideoDetailsQuery = `UPDATE videos SET video_url=?, thumbnail_url=?, video_upload_status='uploaded' WHERE id=?;`;
    await mdb.run(updateVideoDetailsQuery, [
      youtubeVideoId,
      thumbnailResponseBody.items[0].default.url, // Use the correct path to extract the URL
      videoId,
    ]);

    res.json({ message: "Video and thumbnail uploaded successfully." });
  } catch (error) {
    console.error("Error uploading video:", error);
    if (isVideoUploaded) {
      cleanupFiles(null, thumbnailFileName);
      return res
        .status(409)
        .json({ message: "Video uploaded, but thumbnail upload failed." });
    }

    cleanupFiles(videoFileName, thumbnailFileName);
    res.status(500).json({ message: "Failed to upload video." });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "frontend/build")));

// Catch-all handler to send the React app's index.html file for any unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});
