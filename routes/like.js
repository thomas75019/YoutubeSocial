const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');

router.post('/', likeCtrl.CreateLike);
router.get('/', likeCtrl.GetLikes);
router.get('/:id', likeCtrl.GetOneLike);
router.delete('/:id', likeCtrl.DelOneLike);


module.exports = router;