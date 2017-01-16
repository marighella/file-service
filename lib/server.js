'use strict';

import restify from 'restify'
import flickr from './flickr'

export default (port=5000) => {
  const server = restify.createServer({
    name: 'FileService',
  })

  server.use(restify.bodyParser({
    maxBodySize: 3, // * 1024, // * 1000,
    mapFiles: true
  }))

  server.get('/honey', (request, response, next) => {
    response.send(200, 'tchau como vai voce')
    next()
  })

  server.post('/upload', (request, response, next) => {
    response.setHeader('content-type', 'application/json')

    if (request.files === undefined) {
      response.send(400, 'need a file to upload')
    } else {
      let fileName = Object.keys(request.files)[0]
      response.send(201, flickr(request.files[fileName]))
    }
    next()
  })

  server.listen(port)

  return server
}
