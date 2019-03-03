import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import query from '../db/pg';
import * as queries from '../db/utils';


chai.use(chaiHttp);


describe('Post todos/', () => {
  before((done) => {
    const text = 'gadot';
    query(queries.removeItemQuery(text))
      .then(() => done())
      .catch(e => done(e));
  });
  it('should create a new todo', (done) => {
    const text = 'gadot';
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
        if (err) {
          return done(err);
        }
        expect(resp).to.have.status(400);
        if (resp.error) {
          expect(resp.error.text).to.equal('{"status":"bad request","message":"please send correct input"}')
          return done();
        }
        done();
      });
  });
  it('should return a 403 when bad data is sent', (done) => {
    const text = ' ';
    chai.request(app)
      .post('/todos')
      .send({ text })
      .end((err, resp) => {
        if (err) {
          return done(err);
        }
        expect(resp).to.have.status(403);
        if (resp.error) {
          expect(resp.error.text).to.equal('{"status":"Forbidden!","message":"please send correct input"}');
          return done();
        }
        done();
      });
  });
  it('should trigger an error when data is inputed twice', (done) => {
    const text = 'gado';
    chai.request(app)
      .post('/todos')
      .send({ text })
      .end((err, resp) => {
        if (err) {
          console.log('THIS IS FROM TESTS', err);
          return done(err);
        }
        expect(resp.body.text).to.equal();
        done();
      });
  });
});
