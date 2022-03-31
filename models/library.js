const express = require('express');
const mongoose = require('mongoose');

let librarySchema = new mongoose.Schema({
    libraryname: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    book: {
        type: String,
        required: true
    },
    auther: {
        type: String,
        required: true
    },
});
let Library = mongoose.model('Library', librarySchema);
module.exports = Library;
