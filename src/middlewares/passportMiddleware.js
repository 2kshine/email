const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../../models");
const bcrypt = require("bcrypt");
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          const error = new Error("User not found.");
          error.code = "USR_NT_FOUND";
          done(null, false, error);
        }
        const isCorrect = bcrypt.compareSync(password, user.password)
        if (!isCorrect) {
          const error = new Error("Incorrect password.");
          error.code = "INV_LOGIN_PASSWORD";
          done(null, false, error);
        }
        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err);
      }
    }
  )
);

//The serializeUser function stores only the user ID in the session,
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// the deserializeUser function retrieves the user object from the database based on the user ID stored in the session.
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      const error = new Error("User not found.");
      error.code = "USR_NT_FOUND";
      done(null, false, error);
    }
    done(null, user);
  } catch (err) {
    console.log(err);
    return done(err);
  }
});

module.exports = passport;
