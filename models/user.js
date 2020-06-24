const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: { type: Number, required: true },
    type: { type: String, required: true },
    following: {
        user_id: {type: Number, required: false}
    },
    follower: {
        user_id: {type: Number, required: false}
    }
});


module.exports = mongoose.model('User', userSchema);