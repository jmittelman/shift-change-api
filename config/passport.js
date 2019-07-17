const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const config = require("./config");

const User = require("../db/models/User");
// const User = mongoose.model("User");

const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = passport => {
  passport.use(
    new Strategy(params, (payload, done) => {
      User.findById(payload.id)
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id
            });
          }
          return done(null, false);
        })
        .catch(err => console.error(err));
    })
  );
};
