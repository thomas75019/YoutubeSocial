const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: { type: String, required: true },
    email : {type: String, required: true},
    name: {type: String, required: false},
    password: {type: String, required: true},
    following: {
        user_id: {type: Number, required: false}
    },
    follower: {
        user_id: {type: Number, required: false}
    }
});


module.exports = mongoose.model('User', userSchema);