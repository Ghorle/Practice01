const express = require('express');
const mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
    bookname: {
        type: String,
        required: true
    },
    bookprice: {
        type: String,
        required: true
    },
    library: {
        type: String,
        required: true
    },
    auther: {
        type: String,
        required: true
    },
});
let Book = mongoose.model('Book', bookSchema);
module.exports = Book;

