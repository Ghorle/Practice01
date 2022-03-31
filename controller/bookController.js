const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Book = mongoose.model('Book');


router.get('/aOrEb', (req, res) => {
    res.render("book/aOrEb", {
        viewtitle: "Add Book"
    });
});


router.post('/', (req, res) => {
        addBook(req, res);  
});

function addBook(req, res){
    var user = new Book();
    user.bookname = req.body.bookname;
    user.bookprice = req.body.bookprice;
    user.library = req.body.library;
    user.auther = req.body.auther;
    user.save((err, doc) => {
        if (!err) 
            res.redirect('book/booklist');
        else {
            if(err) {
                handleValidationError(err, req.body);
                res.render("book/aOrEb", {
                    viewtitle: "Add Book",
                    user: req.body
                });
            }
            else
                console.log('Error in Adding Record :' + err);
        }
    });
}


router.get('/booklist', (req, res) => {
    Book.find((err, docs) => {
        if(!err) {
            res.render("book/booklist", {
                blist: docs
            });
        }
        else {
            console.log('Error in retrieving Book list :' + err);
        }
    });
});




function handleValidationError(err, body) {
    for(field in err.errors)
    {
        switch (err.errors[field].path) {
            case 'bookname':
                body['booknameError'] = err.errors[field].message;
                break;
            case 'bookprice':
                body['bookpriceError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Book.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("book/aOrEb", {
                viewtitle: "Update Book",
                user: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/book/booklist');
        }
        else {
            console.log('Error in Deleting Book');
        }
    });
});

module.exports = router;