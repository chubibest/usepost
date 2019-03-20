import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import query from '../db/pg';
import { generateToken } from '../models/helper';

chai.use(chaiHttp);

const pocket = { token: null, statusToken: null, id: null };
describe('CREATE USER', () => {
  it('should return an error for bad input', async () => {
    const body = {
      email: null,
      password: null
    };
    const result = await chai.request(app)
      .post('/account')
      .send(body);
    expect(result).to.have.status(400);
    expect(result.text).to.equal('{"status":"bad request","message":"Some values are missing"}');
  });
  it('should return an error for invalid email', async () => {
    const body = {
      email: 'zeus',
      password: 'toto'
    };
    const result = await chai.request(app)
      .post('/account')
      .send(body);
    expect(result).to.have.status(400);
    expect(result.text).to.equal('{"status":"bad request","message":"Input valid email"}');
  });
  it('should create a user with good input', async () => {
    const body = {
      email: 'testes@test.com',
      password: 'test'
    };
    const result = await chai.request(app)
      .post('/account')
      .send(body);
    expect(result).to.have.status(200);
    expect(JSON.parse(result.text).status).to.equal('success');
  });
  it('should return an error for repeated input', async () => {
    const body = {
      email: 'testes@test.com',
      password: 'test'
    };
    const result = await chai.request(app)
      .post('/account')
      .send(body);
    expect(result).to.have.status(400);
    expect(result.text).to.equal('{"message":"User with that EMAIL already exist"}');
  });
});


describe('LOGIN USER', () => {
  it('should return an error for bad input', async () => {
    const body = {
      email: null,
      password: null
    };
    const result = await chai.request(app)
      .post('/login')
      .send(body);
    expect(result).to.have.status(400);
    expect(result.text).to.equal('{"status":"bad request","message":"Some values are missing"}');
  });
  it('should return an error for invalid email', async () => {
    const body = {
      email: 'zeus',
      password: 'toto'
    };
    const result = await chai.request(app)
      .post('/login')
      .send(body);
    expect(result).to.have.status(400);
    expect(result.text).to.equal('{"status":"bad request","message":"Input valid email"}');
  });
  it('should login user with good input', async () => {
    const body = {
      email: 'testes@test.com',
      password: 'test'
    };
    const result = await chai.request(app)
      .post('/login')
      .send(body);
    expect(result).to.have.status(200);
    expect(JSON.parse(result.text).token);
    pocket.token = JSON.parse(result.text).token;
  });
  it('should return an error for unregistered users', async () => {
    const body = {
      email: 'tes@test.com',
      password: 'intruder'
    };
    const result = await chai.request(app)
      .post('/login')
      .send(body);
    expect(result).to.have.status(400);
    expect(result.text).to.equal('{"message":"The credentials you provided is incorrect"}');
  });
  it('should return an error for the wrong password', async () => {
    const body = {
      email: 'testes@test.com',
      password: 'wrong password'
    };
    const result = await chai.request(app)
      .post('/login')
      .send(body);
    expect(result).to.have.status(400);
    expect(result.text).to.equal('{"message":"Incorrect Password"}');
  });
});


describe('test USER', () => {
  it('should return an error for bad input', async () => {
    const body = {
      email: null,
      password: null
    };
    const result = await chai.request(app)
      .post('/account')
      .send(body);
    expect(result).to.have.status(400);
    expect(result.text).to.equal('{"status":"bad request","message":"Some values are missing"}');
  });
  // ;other tests
});


describe('Post todos/', () => {
  // before(async () => {
  //   const text = 'gadot';
  //   await query(queries.removeItemQuery(text));
  // });


  it('should create a new todo', async () => {
    const text = 'gadot';
    const resp = await chai.request(app)
      .post('/todos')
      .set('x-access-token', pocket.token)
      .send({ text });
    expect(resp).to.have.status(201);
    expect(resp.body.result[0].item).to.equal(text);
  });

  it('should return a 400 when nothing  is sent', async () => {
    const nothing = 'null';
    const resp = await chai.request(app)
      .post('/todos')
      .set('x-access-token', pocket.token)
      .send({ nothing });
    expect(resp).to.have.status(400);
    expect(resp.text).to.equal('{"status":"bad request","message":"please send correct input"}');
  });

  it('should return a 403 when bad data is sent', async () => {
    const text = ' ';
    const resp = await chai.request(app)
      .post('/todos')
      .set('x-access-token', pocket.token)
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
      .set('x-access-token', pocket.token)
      .send({ text });
    expect(resp.status).to.equal(409);
    expect(resp.error.text).to.equal('{"status":"error","message":"item already exist"}');
  });
});

describe('GET TODO', () => {
  it('should return a 404 for bad input', async () => {
    const resp = await chai.request(app)
      .get('/todos/nonsense')
      .set('x-access-token', pocket.token);
    expect(resp.text).to.equal('{"status":"error","message":"Item not found","sender":"getItem"}');
    expect(resp).to.have.status(404);
  });
  it('should get a todo', async () => {
    const resp = await chai.request(app)
      .get('/todos/gadot')
      .set('x-access-token', pocket.token);
    expect(JSON.parse(resp.text).yay).to.equal('yay');
    expect(resp).to.have.status(200);
  });
});
describe('UPDATE ITEM', () => {
  it('should update ', async () => {
    const resp = await chai.request(app)
      .patch('/todos/gadot')
      .set('x-access-token', pocket.token);
    expect(resp.status).to.equal(205);
    expect(JSON.parse(resp.text).status).to.equal('updated');
  });
  it('should return a 404 for bad data', async () => {
    const resp = await chai.request(app)
      .patch('/todos/crap')
      .set('x-access-token', pocket.token);
    expect(resp.status).to.equal(404);
    expect((resp.text)).to.equal('{"status":"error","message":"Item not found"}');
  });
});
describe('DELETE TODOS', () => {
  it('should delete a todo', async () => {
    const resp = await chai.request(app)
      .delete('/todos/gadot')
      .set('x-access-token', pocket.token);
    expect(resp.status).to.equal(205);
    expect(resp.text).to.equal('{"status":"success","message":"Item Deleted"}');
  });
  it("should'nt delete a todo twice", async () => {
    const resp = await chai.request(app)
      .delete('/todos/gadot')
      .set('x-access-token', pocket.token);
    expect(resp.status).to.equal(404);
    expect(resp.text).to.equal('{"status":"error","error":"item not found"}');
  });
  it('should return a 404 for bad input', async () => {
    const resp = await chai.request(app)
      .delete('/todos/gadot')
      .set('x-access-token', pocket.token);
    expect(resp.status).to.equal(404);
    expect(resp.text).to.equal('{"status":"error","error":"item not found"}');
  });
});

describe('GET UNCOMPLETED TODOS', () => {
  it('should return an error if there are no uncompleted todoes', async () => {
    const resp = await chai.request(app)
      .get('/todos?completed=false')
      .set('x-access-token', pocket.token);
    expect(resp.status).to.equal(200);
    expect(JSON.parse(resp.text).status).to.equal('error');
    await query({
      text: `INSERT INTO users (email, password) values('email', 'password') 
    ON CONFLICT DO NOTHING`
    });
    const result = await query({ text: "SELECT id FROM users WHERE email = 'email'" });
    await query({
      text: "INSERT INTO todoes (item, owner_id) values('toto', $1) ON CONFLICT DO NOTHING",
      values: [result[0].id]
    });
    pocket.id = result[0].id;
    pocket.statusToken = generateToken(pocket.id);
  });
  it('should return uncompleted todos', async () => {
    const resp = await chai.request(app)
      .get('/todos?completed=false')
      .set('x-access-token', pocket.statusToken);
    expect(resp.status).to.equal(200);
    expect(JSON.parse(resp.text).status).to.equal('success');
  });
});

describe('GET COMPLETED TODOS', () => {
  it('should return an error if there are no completed todoes', async () => {
    const resp = await chai.request(app)
      .get('/todos?completed=true')
      .set('x-access-token', pocket.token);
    expect(resp.status).to.equal(200);
    expect(JSON.parse(resp.text).status).to.equal('error');
    await query({
      text: 'UPDATE todoes SET completed = true WHERE owner_id = $1',
      values: [pocket.id]
    });
  });
  it('should return completed todos', async () => {
    const resp = await chai.request(app)
      .get('/todos?completed=true')
      .set('x-access-token', pocket.statusToken);
    expect(resp.status).to.equal(200);
    expect(JSON.parse(resp.text).status).to.equal('success');
  });
});

describe('GETALL TODOS', () => {
  it('should get all todos', async () => {
    const resp = await chai.request(app)
      .get('/todos')
      .set('x-access-token', pocket.statusToken);
    expect(resp).to.have.status(200);
    expect(JSON.parse(resp.text).status).to.equal('success');
    await query({
      text: 'DELETE FROM todoes WHERE owner_id = $1 returning *',
      values: [pocket.id]
    });
  });
  it('should return an error when there are no todoes', async () => {
    const resp = await chai.request(app)
      .get('/todos')
      .set('x-access-token', pocket.token);
    expect(resp).to.have.status(200);
    expect(JSON.parse(resp.text).status).to.equal('error');
  });
});
describe('Delete Users', () => {
  it('should delete a user', async () => {
    const result = await chai.request(app)
      .delete('/delete')
      .set('x-access-token', pocket.token);
    expect(result).to.have.status(204);
  });
  it('should return an error for no result', async () => {
    const result = await chai.request(app)
      .delete('/delete')
      .set('x-access-token', pocket.token);
    expect(result).to.have.status(404);
    expect(result.text).to.equal('{"message":"user not found"}');
  });
});
describe('verify token', () => {
  it('should return an error for a shit token', async () => {
    const result = await chai.request(app)
      .delete('/delete')
      .set('x-access-token', 'numbthepainwith the mone8');
    expect(result).to.have.status(400);
    expect(result.text).to.equal('{"name":"JsonWebTokenError","message":"jwt malformed"}');
  });
  it('should return an error if no token is provided', async () => {
    const result = await chai.request(app)
      .delete('/delete')
      .set('x-acess-token', 'khhhh');
    expect(result).to.have.status(400);
    expect(result.text).to.equal('{"message":"Token is not provided"}');
  });
});
