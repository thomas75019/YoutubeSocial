const express = require('express');
const router = express.Router();

const SearchController = require('../controllers/searchUser');

router.get('/user/:user_name', SearchController.SearchUser);

module.exports = router;