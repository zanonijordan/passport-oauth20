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
    clientID: '',
    clientSecret: '',
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
