const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const merchantSchema = new Schema({
  type: String,
  username: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  contactNumber: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function
merchantSchema.pre('save', function(next) {
  // get access to the user model
  const merchant = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // hash (encrypt) our password using the salt
    bcrypt.hash(merchant.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text password with encrypted password
      merchant.password = hash;
      next();
    });
  });
});

merchantSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

mongoose.model('merchants', merchantSchema);
