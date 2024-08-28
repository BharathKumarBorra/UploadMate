const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "youtubetimer.db");

let mdb = null;

const initializeDB = async () => {
  if (mdb) return mdb;

  try {
    mdb = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    return mdb;
  } catch (error) {
    process.exit(1);
  }
};

module.exports = { initializeDB, getDB: () => mdb };
