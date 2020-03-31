const constant = require('../utils/constant');
const modelGenerator = require('../utils/model-generator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwtExtension = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const passportLocal = require('passport-local');
const passportGoogle = require('passport-google-oauth20');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = passportLocal.Strategy;
let GoogleStrategy = passportGoogle.Strategy;

const User = require('../models/user');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

const jwt = new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : constant.JWT_SECRET
    },
    function (jwtPayload, cb) {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return User.findOneById(jwtPayload._id)
            .then(user => {
                return cb(null, true, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
)

// LOCAL
const local = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return User.findOne({email: email, type: "local"})
           .then(user => {
               if (!user) {
                   return cb(null, false, {message: 'Incorrect email or password.'});
               }
               bcrypt.compare(password, user.password)
                   .then(result => {
                       if (result) {
                           return cb(null, user, { message: 'Logged In Successfully' });
                       } else {
                           return cb(null, false, { message: 'Incorrect password!' });
                       }
                   })
          })
          .catch(err => cb(err));
    }
)

//  GOOGLE
const google = new GoogleStrategy(
  {
    clientID: constant.GOOGLE_CLIENT_ID,
    clientSecret: constant.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    console.log(cb);
  }

);

passport.use(jwt);
passport.use(local);
passport.use(google);
