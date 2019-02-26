const { expect } = require('chai').expect;
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
        expect(resp.body.text).to.equal(text);
      });
  });
});
