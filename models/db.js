const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hritik', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err) => {
    if(!err) { console.log('Mongodb Connected Successfully.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./user')
require('./book')
require('./library')