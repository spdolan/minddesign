const passport = require('passport')
const User = require('../models/user')
const keys = require('../config/keys')
const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const cookieSession = require('cookie-session')

// Create local strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email: email }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false) }

    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' })
    }

    return done(null, user);
  })
})

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.TOKEN_SECRET
}

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  User.findById(payload.sub, function (err, user) {
    if (err) { return done(err, false) }

    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
})

//Setup options for Google Strategy
const googleOptions = {
  clientID: '577021367449-mh7jqghfspo7vu91kkc3surfce6e905n.apps.googleusercontent.com',
  clientSecret: 'zjr0zpfiErOY4YjEEDDHg8Ud',
  callbackURL: '/auth/google/callback'
}

const googleLogin = new GoogleStrategy(googleOptions,
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then(existingUser => {
      if (existingUser) {
        // we already have a record with the given profile ID
        done(null, existingUser)
      } else {
        // we don't have a user record with this ID, make a new record!
        new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          token: accessToken
        })
          .save()
          .then(user => done(null, user))
      }
    })
  }
)

// Tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)
passport.use(googleLogin)