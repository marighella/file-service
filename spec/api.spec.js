'use strict';

import supertest from 'supertest'
import serverStart from '../lib/server'

const fails = (done) => {
  return (err, res) => {
    if (err) {
      done.fail(err)
    } else {
      done()
    }
  }
}

describe('FileService API', () => {

  var app

  beforeEach(() => {
    app = serverStart(6666)
  })

  afterEach(() => {
    app.close();
  })

  it('should be alive', (done)=>{
    supertest(app)
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

    supertest(app)
      .post('/upload')
      .attach('myfile', 'spec/image.png')
      .expect(201, resultExpected, fails(done))
  })
})
