var Flickr = require("flickrapi"),
  flickrOptions = {
    api_key: process.env.FLICKR_API,
    secret: process.env.FLICKR_SECRET,
  }

Flickr.authenticate(flickrOptions, function(error, flickr) {
  console.log(error)
  console.log(flickr)
})
