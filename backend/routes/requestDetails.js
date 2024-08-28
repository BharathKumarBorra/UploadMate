const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const { ensureAuthenticated, getNewAccessToken } = require("../middleware");

// Get requests
router.get("/requests", ensureAuthenticated, async (request, response) => {
  try {
    const mdb = getDB();
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
router.get(
  "/requests/:videoId",
  ensureAuthenticated,
  async (request, response) => {
    try {
      const mdb = getDB();
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

// Resend request for approval due to expired refresh token
router.get(
  "/resend/:videoId",
  ensureAuthenticated,
  async (request, response) => {
    const { videoId } = request.params;

    try {
      const mdb = getDB();
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
  }
);

module.exports = router;
