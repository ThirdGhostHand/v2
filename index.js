const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('./models/User');
require('./models/Merchant');
require('./models/Item');
require('./models/Survey');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: [keys.cookieKey],
  saveUninitialized: false,
  resave:false,
  store: new MongoStore({mongooseConnection: mongoose.connection, ttl: 2 * 24 * 60 * 60})
  //ttl: 2 days * 24 hours * 60 minutes * 60 seconds
}))
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/storeRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);

