const mongoose = require('mongoose');

const shareSchema = mongoose.Schema({
    _id: {type: Number, required: true},
    url: {
        type: String,
        validate: {
            validator: value => {
                return /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/.test(value);
            },
            message: props => `${props.value} is not a valid URL!`
        },
        required: [true, 'Share URL must be defined']
    },
    message: {
        type: String,
        required: true,
        minLength: [10, 'Message should be a least 10 characters'],
        maxLength: [250, 'Message can\'t be longer than 250 characters']
    },
    user_id: {
        type: String,
        required: [true, 'User ID is required'],
        validate : {
            validator: value => {
                return value.length === 36;
            },
            message: props => `${props.value} is not a valid ID`
        }
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
});

module.exports = mongoose.model('Share', shareSchema);