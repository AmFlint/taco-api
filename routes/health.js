var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.status(200).send({healthy: true, status: 200});
});

module.exports = router;
