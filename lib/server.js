'use strict';

import cookieParser from 'cookie-parser'
import { ensureLoggedIn } from 'connect-ensure-login'

import express from 'express'
import expressSession from 'express-session'

import morgan from 'morgan'
import multer from 'multer'

import passport from 'passport'
import { Strategy } from 'passport-flickr'

const flickrOptions = {
  consumerKey: process.env.CLIENT_KEY       || 'a',
  consumerSecret: process.env.CLIENT_SECRET || 'b',
  callbackURL: 'http://localhost:3000/login/flickr/return',
  userAuthorizationURL: 'https://www.flickr.com/services/oauth/authorize?perms=write'
}

passport.use(new Strategy(flickrOptions, (accessToken, refreshToken, profile, cb) => {
  return cb(null, profile)
}))

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete profile is serialized
// and deserialized.
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

const app = express();
const upload = multer({ dest: __dirname + '/uploads'});

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(morgan('combined'));
app.use(cookieParser());
app.use(expressSession({
  secret: process.env.SESSION_SECRET || 'woof',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Home & User profile
app.get('/', (req, res) => res.render('home', {user: req.user}));
app.get('/profile', ensureLoggedIn(), (req, res) =>
  res.render('profile', {user: req.user}))

// Login structure
app.get('/login', (req, res) => res.render('login'));
app.get('/login/flickr', passport.authenticate('flickr'));
app.get('/login/flickr/return',
        passport.authenticate('flickr', {failureRedirect: '/login'}),
        (req, res) => res.redirect('/'))

// Image Upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file === undefined) {
    res.status(400).send('')
  } else {
    res.status(201).send({
      link: "//farm1.staticflickr.com/648/32332461705_bd3eeddd05_b.jpg",
      original: "//farm1.staticflickr.com/648/32332461705_fd5e61f0d7_o.png",
      thumbnail: "//farm1.staticflickr.com/648/32332461705_bd3eeddd05_t.jpg",
      medium: "//farm1.staticflickr.com/648/32332461705_bd3eeddd05_z.jpg",
      small: "//farm1.staticflickr.com/648/32332461705_bd3eeddd05_n.jpg",
      title: req.file.originalname
    })
  }
})

app.all('/upload', (req, res, next) =>
  res.header('Allow', 'POST').status(405).send(''))

export default (port=3000) => {
  return app.listen(port)
}
