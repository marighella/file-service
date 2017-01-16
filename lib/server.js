'use strict';

import restify from 'restify'
import flickr from './flickr'

export default (port=5000) => {
  const server = restify.createServer({
    name: 'FileService',
  })

  server.get('/honey', (request, response, next) => {
    response.send(200, 'tchau como vai voce')
    next()
  })

  server.post('/upload', (request, response, next) => {
    response.setHeader('content-type', 'application/json')
    response.send(201, flickr(request))
    next()
  })

  server.listen(port)

  return server
}
