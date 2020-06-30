const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    _id: {type : String, required: true},
    user_id: {
        type: String,
        validate: {
            validator: value => {
                return value.length === 36;
            },
            message: props => `${props.value} is not a valid id`
        },
        required: [true, 'User Id must be defined'],
    },
    url: {
        type: String,
        validate: {
            validator: value => {
                return /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/.test(value);
            },
            message: props => `${props.value} is not a valid URL!`
        },
        required: [true, 'Like URL must be defined']
    },
    date: {type: Date, required: [true, 'Date must be defined'], default: Date.now()},
});

module.exports = mongoose.model('Like', likeSchema);