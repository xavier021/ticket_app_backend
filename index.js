require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const ticketsRoutes = require("./routes/ticketsRoutes")
const usersRoutes = require("./routes/usersRoutes");
const initializingPassport = require("./middleware/InitializingPass");

initializingPassport();

const main = async () => {
  const app = express();
  app.use(
    cors({
      origin: process.env.ADDR,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  //ROUTES
  app.use("/api/tickets", ticketsRoutes)
  app.use("/api/users", usersRoutes)

  app.listen(process.env.PORT, () => {
    console.log("server started on port " + process.env.PORT);
  });
};

main().catch((error) => {
  console.error(error);
});
