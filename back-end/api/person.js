const express = require("express");
const router = express.Router();

//get all people
router.get('/all', async (req, res) => {
    let sql = 'SELECT * FROM Person';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    })
})

module.exports = router;
