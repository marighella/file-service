'use strict';

import passport from 'passport'
import restify from 'restify'
import session from 'restify-session'
import * as flickr from './flickr'

const firstFile = (files) =>
  files[Object.keys(files)[0]]

export default (port=5000) => {

  flickr.init()

  const server = restify.createServer({
    name: 'FileService',
  })

  server.use(session().sessionManager)

  server.use(restify.bodyParser({
    maxBodySize: 3, // * 1024, // * 1000,
    mapFiles: true
  }))

  server.get('/honey', (request, response, next) => {
    response.send(200, 'tchau como vai voce')
    next()
  })

  server.get('/auth/flickr', passport.authenticate('flickr'))

  server.get(
    '/auth/flickr/callback',
    passport.authenticate('flickr', { failureRedirect: '/login' }))

  server.post('/upload', (request, response, next) => {
    response.setHeader('content-type', 'application/json')

    if (request.files === undefined) {
      response.send(400, 'need a file to upload')
    } else {
      response.send(201, flickr.upload(firstFile(request.files)))
    }
    next()
  })

  server.listen(port)

  return server
}
