const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;

async function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);

    if (user === null) {
      console.log("Not found");
      return done(null, false, { message: "No user with that email" });
    }

    try {
      if (await bcrypt.compare(password, user.rows[0].password)) {
        return done(null, user);
      } else {
        console.log("Wrong password");
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (error) {
      return done(error);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user.rows[0].id));
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
}

module.exports = initialize;
