const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');


router.get('/', (req, res) => {
    res.render("home", {
        viewtitle: "Welcome to My Application"
    });
});

router.get('/aOrE', (req, res) => {
    res.render("user/aOrE", {
        viewtitle: "Add User"
    });
});


router.post('/', (req, res) => {
    if (req.body._id == '')
        addRecord(req, res);
        else
        updateRecord(req, res);
});

function addRecord(req, res){
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.phone = req.body.phone;
    user.save((err, docs) => {
        if (!err) 
            res.redirect('user/list');
        else {
            if(err) {
                handleValidationError(err, req.body);
                res.render("user/aOrE", {
                    viewtitle: "Add User",
                    user: req.body
                });
            }
            else
                console.log('Error in Adding Record :' + err);
        }
    });
}

function updateRecord(req, res) {
    User.findOneAndUpdate({_id: req.body._id}, req.body, { new: false }, (err, doc) => {
        if (!err) { res.redirect('user/list'); }
        else {
            if (err) {
                handleValidationError(err, req.body);
                res.render("user/aOrE", {
                    viewtitle: 'Update User',
                    user: req.body
                });
            }
            else 
                console.log('Error in Updating Record :' + err);
        }
    });
}

router.get('/list', (req, res) => {
    User.find((err, docs) => {
        if(!err) {
            res.render("user/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving User list :' + err);
        }
    });
});



function handleValidationError(err, body) {
    for(field in err.errors)
    {
        switch (err.errors[field].path) {
            case 'username':
                body['usernameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("user/aOrE", {
                viewtitle: "Update User",
                user: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/user/list');
        }
        else {
            console.log('Error in Deleting Record');
        }
    });
});

module.exports = router;