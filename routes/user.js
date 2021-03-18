const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const userCtrl = require('../controllers/user');

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);
router.post('/add/follower', auth, userCtrl.addFollower);
router.post('/add/following', auth, userCtrl.addFollowing);
router.get('/user/:id', auth, userCtrl.getUser);


module.exports = router;