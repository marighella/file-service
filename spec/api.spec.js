'use strict';

var request = require('supertest'),
    server  = require('../lib/server')

const fails = function(done){
  return (err, res) => {
    if (err) {
      done.fail(err)
    } else {
      done()
    }
  }
}

describe('FileService API', ()=>{

  var app

  beforeEach(()=>{
    app = server.start(6666)
  })

  afterEach(()=>{
    app.close();
  })

  it('should be alive', (done)=>{
    request(app)
      .get('/honey')
      .expect(200)
      .end(fails(done))
  })

  it('should return a json file with flickr links', (done) => {

    const resultExpected = {
      link: "//farm1.staticflickr.com/648/32332461705_bd3eeddd05_b.jpg",
      original: "//farm1.staticflickr.com/648/32332461705_fd5e61f0d7_o.png",
      thumbnail: "//farm1.staticflickr.com/648/32332461705_bd3eeddd05_t.jpg",
      medium: "//farm1.staticflickr.com/648/32332461705_bd3eeddd05_z.jpg",
      small: "//farm1.staticflickr.com/648/32332461705_bd3eeddd05_n.jpg",
      title: "image.png"
    }

    request(app)
      .post('/upload')
      .attach('myfile', 'spec/image.png')
      .expect(201, resultExpected, fails(done))
  })

})