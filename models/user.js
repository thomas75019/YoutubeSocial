const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: { type: Number, required: true },
    type: { type: String, required: true },
    following: { type: Array, required: false},
    follower: {type: Array, required: false}
});


module.exports = mongoose.model('User', userSchema);