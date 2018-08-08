const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
const Merchant = mongoose.model('merchants');

module.exports = app => {
  
  app.post('/auth/signup', (req, res) => {

    const { username, email, password } = req.body
    // ADD VALIDATION
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with this email: ${email}`
            })
        }
        else {
            const newUser = new User({
                type: "user",
                username: username,
                email: email,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})

app.post('/auth/merchantSignup', (req, res) => {
  const { username, email, password } = req.body
  // ADD VALIDATION
  Merchant.findOne({ email: email }, (err, merchant) => {
      if (err) {
          console.log('Merchant.js post error: ', err)
      } else if (merchant) {
          res.json({
              error: `Sorry, already a trader with this email: ${email}`
          })
      }
      else {

          const newMerchant = new Merchant({
              type: "merchant",
              username: username,
              email: email,
              password: password
          })
          newMerchant.save((err, savedMerchant) => {
              if (err) return res.json(err)
              res.json(savedMerchant, "merchant")
          })
      }
  })
})

  app.post(
    "/auth/local",
    passport.authenticate("userLocal", { FailureRedirect: "/signin" }),
    (req, res) => {
      res.send(req.user);
    }
  );

  app.post(
    "/auth/merchant",
    passport.authenticate("merchantLocal", { FailureRedirect: "/signin" }),
    (req, res) => {
    res.send(req.user);
    }
  );

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      //Get rid of backend redirects!!
      res.redirect('/');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
