const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;;
const PORT = 3000
const app = express()
passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: '809455319474-ab7dnb3tmdsg6ddq6687ub0oa04e6n3u.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "https://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {

    console.log(profile);
    cb(null, profile)

  }
));

app.get('/google',
  passport.authenticate('google', {scope:['profile']})
)

app.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('Login Successful');
  });

  app.listen(PORT)
