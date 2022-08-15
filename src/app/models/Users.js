const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require('express-session');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxLength: 255,
    },
    email: {
      type: String,
      required: true,
      maxLength: 400,
    },
    password: {
      type: String,
      required: true,
      maxLength: 255,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model('Users', UserSchema);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  Users.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new localStrategy(function (username, password, done) {
    Users.findOne({ username: username }, function (err, user) {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Incorrect username.' });
      bcrypt.compare(password, user.password, function (err, res) {
        if (err) return done(err);
        if (res === false)
          return done(null, false, { message: 'Incorrect password.' });
        return done(null, user);
      });
    });
  })
);

const isLoggedOut = function (req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect('/');
};

const userInfor = async function (req, res, next) {
  if (req.isAuthenticated()) {
    const id = req.session.passport.user;
    await Users.findOne({ _id: id }).then((user) => {
      res.locals.user = {
        userid: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
      };
      console.log(res.locals.user);
    });
    return next();
  } else {
    console.log('please login');
    res.redirect('/auth/login');
  }
};

module.exports = {
  Users,
  userInfor,
  isLoggedOut,
};
