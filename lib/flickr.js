import Flickr from 'flickrapi'

const flickrOptions = {
  api_key: process.env.FLICKR_KEY,
  secret: process.env.FLICKR_SECRET,
}

export default (fileToUpload) => {
  Flickr.authenticate(flickrOptions, (error, flickr) => {
    console.log(error)
    console.log(flickr)
  })
}
