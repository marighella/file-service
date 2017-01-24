import passport from 'passport'
import { Strategy as FlickrStrategy } from 'passport-flickr'

const flickrOptions = {
  api_key: process.env.FLICKR_KEY   || 'a',
  secret: process.env.FLICKR_SECRET || 'b',
}

export const init = () => {
  const flickrAuthOptions =
    passport.use(new FlickrStrategy({
      consumerKey: flickrOptions.api_key,
      consumerSecret: flickrOptions.secret,
      callbackURL: "http://127.0.0.1:5000/auth/flickr/callback"
    }, (token, tokenSecret, profile, done) => done(nil)));
}

export const upload = (fileToUpload) => {
  return {
    link: "//farm1.staticflickr.com/648/32332461705_bd3eeddd05_b.jpg",
    original: "//farm1.staticflickr.com/648/32332461705_fd5e61f0d7_o.png",
    thumbnail: "//farm1.staticflickr.com/648/32332461705_bd3eeddd05_t.jpg",
    medium: "//farm1.staticflickr.com/648/32332461705_bd3eeddd05_z.jpg",
    small: "//farm1.staticflickr.com/648/32332461705_bd3eeddd05_n.jpg",
    title: fileToUpload.name
  }
}
