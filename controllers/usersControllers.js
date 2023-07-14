const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.ROUNDS);
const passport = require("passport");
const pool = require("../db");

const registerUser = async (req, res) => {
  const createUser =
    "INSERT INTO users(ticket_admin,ticket_agent,full_name,email,phone,password) VALUES (false,true,$1,$2,$3,$4)";
  const fullName = req.body.fullName;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;

  console.log(req.body);

  try {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      console.log(saltRounds);
      console.log(hash);
      console.log(err);
      const newUser = await pool.query(createUser, [
        fullName,
        email,
        phone,
        hash,
      ]);
      console.log(newUser);
    });
  } catch (e) {
    console.log(e);
  }
};

const isLoggedIn = (req, res) => {
  if (req.session) {
    // console.log(req.session.passport.user);
    if (req.session.passport) {
      return res.status(200).json({ user: req.session.user });
    } else {
      return res.status(404).json({ message: "not found" });
    }
  } else {
    return res.status(404).json({ message: "no cookie" });
  }
};

const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(404).send("No user exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        //adding cookie property
        const { password, ...userData } = user.rows[0];
        req.session.user = userData;
        res.send("Success");
      });
    }
  })(req, res, next);
};

const logoutUser = (req, res, next) => {
  console.log(req.session);

  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      res.clearCookie("connect.sid");
      res.json({ message: "logout sucess" });
      console.log(req.session);
    });
  });
};

const getAdmins = async (req, res) => {
  try {
    const getTech =
      "SELECT id AS value, full_name AS label FROM users WHERE ticket_admin=true";

    const tech = await pool.query(getTech);
    // console.log(tech.rows)
    return res.status(200).json({ admin: tech.rows });
  } catch (err) {
    console.error(err.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const getUser = "SELECT id AS value, full_name AS label FROM users";
    const user = await pool.query(getUser);

    return res.status(200).json({ user: user.rows });
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  registerUser,
  isLoggedIn,
  loginUser,
  logoutUser,
  getAdmins,
  getUsers,
};
