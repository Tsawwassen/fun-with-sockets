var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send({ response: "I am alive" }).status(200);
});



module.exports = router;