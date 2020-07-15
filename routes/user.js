const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);
router.post('/add/follower', userCtrl.addFollower);
router.post('/add/following', userCtrl.addFollowing);


module.exports = router;