const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    _id: {type : Number, required: true},
    user_id: {type: Number, required: true},
    url: {type: String, required: true},
    date: {type: Date, required: true},
});

module.exports = mongoose.model('Like', likeSchema);