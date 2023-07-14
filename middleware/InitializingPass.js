const passport = require("passport");
const pool = require("../db");
const initializePassport = require("./passport-config");

const initializingPassport = () => initializePassport(
    passport,
    async (email) => {
      const queryPass = "SELECT * FROM users WHERE email = $1";
      const usrPass = await pool.query(queryPass, [email]);
      return usrPass;
    },
    async (id) => {
      const queryId = "SELECT * FROM users WHERE id = $1";
      const usrId = await pool.query(queryId, [id]);
      return usrId;
    }
  );

  module.exports = initializingPassport;