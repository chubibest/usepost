const { Client } = require('pg')
const client = new Client({
    connectionString: process.env.DATABASE_URL
});
client.connect().then(()=>{console.log('connected')},(e)=>{console.log(e)})
client.on('connect' , ()=> {console.log('connected to server')})