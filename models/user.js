const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: { type: String, required: true },
    email : {
        type: String,
        required: [true, 'Email is required'],
        validate : {
            validator: value => {
                return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
                    .test(value);
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        validate: value => {
            return value.length >= 3 && value.length <= 30;
        },
        message: props => `${props.value} lenght should be between 3 and 30 characters`
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    following: {
        user_id: {type: Number, required: false}
    },
    follower: {
        user_id: {type: Number, required: false}
    }
});


module.exports = mongoose.model('User', userSchema);