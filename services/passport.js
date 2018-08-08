const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
const Merchant = mongoose.model('merchants');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if(err) done(err);
      if(user){
        done(null, user);
      } else {
         Merchant.findById(id, function(err, user){
         if(err) done(err);
         done(null, user);
      })
    }
  })
});
// passport.deserializeUser((id, done) => {
//   User.findById(id).then(user => {
//     done(null, user);
//   });
// });

const localOptions = { usernameField: 'email' };
passport.use(
  'userLocal', new LocalStrategy(localOptions, function(email, password, done) {

  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
      });
    });
  })
);

const merchantLocalOptions = { usernameField: 'email' };
passport.use(
  'merchantLocal', new LocalStrategy(merchantLocalOptions, function(email, password, done) {

  Merchant.findOne({ email: email }, function(err, merchant) {
    if (err) { return done(err); }
    if (!merchant) { return done(null, false); }

    merchant.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }
      return done(null, merchant);
      });
    });
  })
);


passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.email });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
