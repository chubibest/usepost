const { Client } = require('pg')
require ('dotenv').config()
const client = new Client({
    connectionString: process.env.DATABASE_URL
});
client.on('connect' , ()=> {console.log('connected to server')})
client.connect().then(()=>{console.log('connected')},(e)=>{console.log(e)})
const query = `CREATE TABLE IF NOT EXISTS todo(id varchar(20) PRIMARY KEY,item varchar(20),completed boolean)` 
client.query(query).then((res)=>console.log(res)).catch((e)=>console.log(e))
console.log('hmmn')