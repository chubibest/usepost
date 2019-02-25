const pool = require('../db/pg')

const createUserTable = (Client) =>{
  const query = `CREATE TABLE todoes (
     id serial primary key,
     item varchar(20) not null,
     created_at timestamptz not null default now(),
     completed boolean default false, 
      completed_at timestamptz default null)`;
  Client.then(client => client.query(query).then((res) => {
    client.release();
    console.log(res.rows);
  }, e => console.log(e)), e => console.log(e));
};

createUserTable(pool);
