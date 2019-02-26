const { expect } = require('chai');
const request = require('supertest');

const app = require('../server');
const operations = require('../models/operations');

describe('Post todos/', () => {
  it('should create a new todo', (done) => {
    const text = 'gadot';
    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((resp) => {
        // this is wer d magic happens
        expect(resp.body.item).to.equal(text);
      })
      .end((err, resp) => {
        if (err) {
          return done(err);
        }
        operations.getItem('gadot').then((res) => {
          expect(res.rows[0].item).to.equal(resp.body.item);
          done();
        }).catch(e => done(e));
      });
  });
});
