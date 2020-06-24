const express = require('express');
const router = express.Router();

const Share = require('../models/share');

router.get('/share/:id');
router.get('/shares');
router.post('/share');
router.patch('/share');
router.del('/share');

module.exports = router;