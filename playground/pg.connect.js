const { Client } = require('pg')
require ('dotenv').config()
const client = new Client({
    connectionString: process.env.DATABASE_URL
});
client.on('connect' , ()=> {console.log('connected to server')})
client.connect().then(()=>{console.log('connected')},(e)=>{console.log(e)})
// const query = `CREATE TABLE IF NOT EXISTS todo(id SERIAL PRIMARY KEY,item varchar(20),completed boolean)` 
// const query = {
//     text : " INSERT INTO todo  (item, completed) values ($1,$2) returning *",
//     values : ['die',false]
// }
// const query = `SELECT COUNT(id) FROM todo WHERE  completed = true `
// const query =  ` delete from todo where id=6 returning *`
const query = ` UPDATE todo  SET completed = true WHERE id = 7 RETURNING *`
client.query(query).then((res)=>{console.log(res)}).catch((e)=>console.log(e))
console.log('hmmn')