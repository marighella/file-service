'use strict';

var restify = require('restify'),
    flickr  = require('./flickr')

let honey = (request, response, next) => {
  response.send(200, 'tchau como vai voce');
  next();
};

let upload = (request, response, next) => {
  response.setHeader('content-type', 'application/json');
  response.send(201, flickr(fileToUpload).upload());

  next();
};

exports.start = function(port = 5000){
  const server  = restify.createServer({
    name: 'FileService',
  });

  server.get('/honey', honey);
  server.post('/upload', upload);
  server.listen(port);

  return server;
};
