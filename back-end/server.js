const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const app = express();

app.use(cors())

app.use(express.json({ extended: false}));

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

//test
app.get('/all', async (req, res) => {
    let sql = 'SELECT * FROM Person';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started'));