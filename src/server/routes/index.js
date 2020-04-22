const express = require('express');
const router  = express.Router();

const api = require('./api')

router.use('/api', api);
router.get('/', (req, res) => res.send("Homepage"));

module.exports = router;