const express = require('express');
const mysql = require('mysql');

const app = express();

//create connection * 'vec353.encs.concordia.ca' = server ,  else localhost
const db = mysql.createConnection(
    {
        host: 'localhost',
        port:  '3306',
        user: 'vec353_4',
        password: 'Data353b',
        database: 'vec353_4',
        connectTimeout: 30000
    }
)

db.connect((err) => {
    if(err){
        console.error('error connecting: ', err);
    }
    console.log('mysql connected...')
})

app.listen('5000', () => {
    console.log('server started');
})