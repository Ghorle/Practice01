const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Library = mongoose.model('Library');


router.get('/aOrEl', (req, res) => {
    res.render("library/aOrEl", {
        viewtitle: "Add Library"
    });
});

router.post('/', (req, res) => {
        addLibrary(req, res);  
});

function addLibrary(req, res){
    let usern = mongoose.Types.ObjectId(req.params.username);
    let bookn = mongoose.Types.ObjectId(req.params.bookname);
    var user = new Library();
    user.libraryname = req.body.libraryname;
    user.department = req.body.department;
    user.book = bookn;
    user.auther = usern;
    user.save((err, doc) => {
        if (!err) 
            res.redirect('library/liblist');
        else {
            if(err) {
                handleValidationError(err, req.body);
                res.render("library/aOrEl", {
                    viewtitle: "Add Library",
                    user: req.body
                });
            }
            else
                console.log('Error in Adding Record :' + err);
        }
    });
}


router.get('/liblist', (req, res) => {
    Library.find((err, docs) => {
        if(!err) {
            res.render("library/liblist", {
                llist: docs
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
            case 'libraryname':
                body['librarynameError'] = err.errors[field].message;
                break;
            case 'department':
                body['departmentError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Library.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("library/aOrEl", {
                viewtitle: "Update Library",
                user: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Library.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/library/liblist');
        }
        else {
            console.log('Error in Deleting Book');
        }
    });
});

module.exports = router;