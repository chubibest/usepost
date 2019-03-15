import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import query from '../db/pg';
import * as queries from '../db/utils';


chai.use(chaiHttp);

describe('Post todos/', () => {
  before(async () => {
    const text = 'gadot';
    await query(queries.removeItemQuery(text));
  });


  it('should create a new todo', async () => {
    const text = 'gadot';
    const resp = await chai.request(app)
      .post('/todos')
      .send({ text });
    expect(resp).to.have.status(201);
    expect(resp.body.result[0].item).to.equal(text);
  });

  it('should return a 400 when nothing  is sent', async () => {
    const nothing = 'null';
    const resp = await chai.request(app)
      .post('/todos')
      .send({ nothing });
    expect(resp).to.have.status(400);
    expect(resp.text).to.equal('{"status":"bad request","message":"please send correct input"}');
  });

  it('should return a 403 when bad data is sent', async () => {
    const text = ' ';
    const resp = await chai.request(app)
      .post('/todos')
      .send({ text });
    expect(resp).to.have.status(403);
    if (resp.error) {
      expect(resp.error.text).to.equal('{"status":"Forbidden!","message":"please send correct input"}');
    }
  });

  it('should trigger an error when data is inputed twice', async () => {
    const text = 'gadot';
    const resp = await chai.request(app)
      .post('/todos')
      .send({ text });
    expect(resp.status).to.equal(409);
    expect(resp.error.text).to.equal('{"status":"error","message":"item already exist"}');
  });
});

describe('GET TODO', () => {
  it('should return a 404 for bad input', async () => {
    const resp = await chai.request(app)
      .get('/todos/nonsense');
    expect(resp.text).to.equal('{"status":"error","message":"Item not found","sender":"getItem"}');
    expect(resp).to.have.status(404);
  });
  it('should get a todo', async () => {
    const resp = await chai.request(app)
      .get('/todos/gadot');
    expect(JSON.parse(resp.text).yay).to.equal('yay');
    expect(resp).to.have.status(200);
  });
});
describe('UPDATE ITEM', () => {
  it('should update ', async () => {
    const resp = await chai.request(app)
      .patch('/todos/gadot');
    expect(resp.status).to.equal(205);
    expect(JSON.parse(resp.text).status).to.equal('updated');
  });
  it('should return a 404 for bad data', async () => {
    const resp = await chai.request(app)
      .patch('/todos/crap');
    expect(resp.status).to.equal(404);
    expect((resp.text)).to.equal('{"status":"error","message":"Item not found"}');
  });
});
describe('DELETE TODOS', () => {
  it('should delete a todo', async () => {
    const resp = await chai.request(app)
      .delete('/todos/gadot');
    expect(resp.status).to.equal(205);
    expect(resp.text).to.equal('{"status":"success","message":"Item Deleted"}');
  });
  it("should'nt delete a todo twice", async () => {
    const resp = await chai.request(app)
      .delete('/todos/gadot');
    expect(resp.status).to.equal(404);
    expect(resp.text).to.equal('{"status":"error","error":"item not found"}');
  });
  it('should return a 404 for bad input', async () => {
    const resp = await chai.request(app)
      .delete('/todos/gadot');
    expect(resp.status).to.equal(404);
    expect(resp.text).to.equal('{"status":"error","error":"item not found"}');
  });
});

describe('GET COMPLETED TODOS', () => {
  it('should return an error if there are no completed todoes', async () => {
    const resp = await chai.request(app)
      .get('/todos?completed=true');
    expect(resp.status).to.equal(200);
    expect(JSON.parse(resp.text).status).to.equal('error');
    await query({
      text: 'INSERT INTO TODOES (item, completed) values($1, $2)',
      values: ['sth', true]
    });
  });
  it('should return completed todos', async () => {
    const resp = await chai.request(app)
      .get('/todos?completed=true');
    expect(resp.status).to.equal(200);
    expect(JSON.parse(resp.text).status).to.equal('success');
  });
});

describe('GET UNCOMPLETED TODOS', () => {
  it('should return an error if there are no uncompleted todoes', async () => {
    const resp = await chai.request(app)
      .get('/todos?completed=false');
    expect(resp.status).to.equal(200);
    expect(JSON.parse(resp.text).status).to.equal('error');
    await query({
      text: 'INSERT INTO TODOES (item) values($1)',
      values: ['sh']
    });
  });
  it('should return uncompleted todos', async () => {
    const resp = await chai.request(app)
      .get('/todos?completed=false');
    expect(resp.status).to.equal(200);
    expect(JSON.parse(resp.text).status).to.equal('success');
  });
});

describe('GETALL TODOS', () => {
  it('should get all todos or return an error message when there are no todoes', async () => {
    const resp = await chai.request(app)
      .get('/todos');
    expect(resp).to.have.status(200);
    await query('DELETE FROM todoes');
  });
  it('should return an error when there are no todoes', async () => {
    const resp = await chai.request(app)
      .get('/todos');
    expect(resp).to.have.status(200);
    expect(JSON.parse(resp.text).status).to.equal('error');
  });
});
