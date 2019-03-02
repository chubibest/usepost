import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import query from '../db/pg';
import * as queries from '../db/utils';

const { expect } = chai;
chai.use(chaiHttp);


describe('Post todos/', () => {
  const text = 'gadot';
  before(() => {
    query(queries.removeItemQuery(text))
      .then(result => console.log('this item was deleted before test ran', result))
      .catch(e => console.log('database error', e));
  });
  it('should create a new todo', (done) => {
    chai.request(app)
      .post('/todos')
      .send({ text })
      .end((err, resp) => {
        if (err) {
          return done(err);
        }
        expect(resp).to.have.status(201);
        expect(resp.body.result[0].item).to.equal(text);
        done();
      });
  });
});
