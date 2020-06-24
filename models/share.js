const mongoose = require('mongoose');

const shareSchema = mongoose.Schema({
    _id: {type: Number, required: true},
    url: {type: String, required: true},
    message: {type : String, required: true},
    user_id: {type: Number, required: true},
    date: {type: Date, required: true},
});

module.exports = mongoose.model('Share', shareSchema);