const express = require('express');
const router = express.Router();

const shareCtrl = require('../controllers/share');

router.get('/:id', shareCtrl.getOneShare);
router.get('/all/:user_id', shareCtrl.getAllShares);
router.post('/', shareCtrl.createShare);
router.patch('/:id', shareCtrl.updateShare);
router.delete('/:id', shareCtrl.deleteShare);

module.exports = router;