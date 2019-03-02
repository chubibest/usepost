import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import query from '../db/pg';
import * as queries from '../db/utils';


chai.use(chaiHttp);


describe('Post todos/', () => {
  const text = 'gadot';
  before((done) => {
    query(queries.removeItemQuery(text))
      .then(() => done())
      .catch(e => done(e));
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
  it('should return a 400 when nothing  is sent', (done) => {
    const nothing = null;
    chai.request(app)
      .post('/todos')
      .send({ nothing })
      .end((err, resp) => {
        expect(resp).to.have.status(400);
        if (resp.error) {
          return done();
        }       
        console.log('THIS IS THE RESPONSE IN SERVERTESTJS', resp.error);
        console.log('THIS IS THE ERROR', err)
        done();
      });
  });
});
