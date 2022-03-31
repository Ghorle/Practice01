const e = require('express');
const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String,
        required: 'Email cannot be empty'
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

// custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex =   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(val);
}, 'Invalid Email.');
let User = mongoose.model('User', userSchema);
module.exports = User;
