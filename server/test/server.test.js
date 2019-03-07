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
          expect(resp.error.text).to.equal('{"status":"bad request","message":"please send correct input"}');
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
    const text = 'gadot';
    chai.request(app)
      .post('/todos')
      .send({ text })
      .end((err, resp) => {
        if (err) {
          return done(err);
        }
        expect(resp).to.have.status(409);
        expect(resp.error.text).to.equal('{"status":"error","message":"item already exist"}');
        done();
      });
  });
});
describe('GETALL TODOS', () => {
  it('should get all todos', (done) => {
    chai.request(app)
      .get('/todos')
      .end((err, resp) => {
        if (err) {
          return done(err);
        }
        expect(resp).to.have.status(200);
        done();
      });
  });
});
describe('GET TODO', () => {
  it('should return a 404 for bad input', (done) => {
    chai.request(app)
      .get('/todos/nonsense')
      .end((err, resp) => {
        if (err) {
          return done(err);
        }
        expect(resp.text).to.equal('{"status":"error","message":"Item not found","sender":"getItem"}');
        expect(resp).to.have.status(404);
        done();
      });
  });
});
// describe('UPDATE ITEM', () => {
//   it('should update ', (done) => {
//     chai.request(app)
//       .patch('/todos/gadot')
//       .end((err, resp) => {
//         if (err) {
//           return done(err);
//         }
//         expect(resp.status).to.equal(205);
//         expect(resp.text).to.equal();
//       });
//   });
// });
describe('DELETE TODOS', () => {
  it('should delete a todo', (done) => {
    chai.request(app)
      .delete('/todos/gadot')
      .end((err, resp) => {
        if (err) {
          return done(err);
        }
        expect(resp.status).to.equal(205);
        expect(resp.text).to.equal('{"status":"success","parameter":"Deleted"}');
        done();
      });
  });
  it("should'nt delete a todo twice", (done) => {
    chai.request(app)
      .delete('/todos/gadot')
      .end((err, resp) => {
        if (err) {
          return done(err);
        }
        expect(resp.status).to.equal(404);
        expect(resp.text).to.equal('{"status":"error","error":"item not found","from":"delete query"}');
        done();
      });
  });
  it('should return a 404 for bad input', (done) => {
    chai.request(app)
      .delete('/todos/gadot')
      .end((err, resp) => {
        if (err) {
          return done(err);
        }
        expect(resp.status).to.equal(404);
        expect(resp.text).to.equal('{"status":"error","error":"item not found","from":"delete query"}');
        done();
      });
  });
});
