import Flickr from 'flickrapi'

const flickrOptions = {
  api_key: process.env.FLICKR_KEY,
  secret: process.env.FLICKR_SECRET,
}


/* Flickr.authenticate(flickrOptions, (error, flickr) => {
 *   console.log(error)
 *   console.log(flickr)
 * })
 */


export default (fileToUpload) => ({
  link: "//farm1.staticflickr.com/648/32332461705_bd3eeddd05_b.jpg",
  original: "//farm1.staticflickr.com/648/32332461705_fd5e61f0d7_o.png",
  thumbnail: "//farm1.staticflickr.com/648/32332461705_bd3eeddd05_t.jpg",
  medium: "//farm1.staticflickr.com/648/32332461705_bd3eeddd05_z.jpg",
  small: "//farm1.staticflickr.com/648/32332461705_bd3eeddd05_n.jpg",
  title: "image.png"
})
