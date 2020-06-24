const express = require('express');
const router = express.Router();

const Like = require('../models/like');
const likeCtrl = require('../controllers/like');

router.post('/like', likeCtrl.CreateLike);
router.get('/likes', likeCtrl.GetLikes);
router.get('/like/:id', likeCtrl.GetOneLike);
router.del('/like/:id', likeCtrl.DelOneLike);


module.exports = router;