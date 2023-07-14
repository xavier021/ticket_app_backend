const {
  registerUser,
  isLoggedIn,
  loginUser,
  logoutUser,
  getAdmins,
  getUsers,
} = require("../controllers/usersControllers");

const isAuth = require("../middleware/isAuth");

const router = require("express").Router();

router.post("/user", isLoggedIn);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/getadmin", isAuth, getAdmins);

router.get("/getusers", isAuth, getUsers);

module.exports = router;

