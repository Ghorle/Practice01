require('./models/db');
const Handlebars = require('handlebars');
const express = require('express');
const path = require('path');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const userController = require('./controller/userController.js');
const bookController = require('./controller/bookController.js');
const libraryController = require('./controller/libraryController.js');

const app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'main',handlebars: allowInsecurePrototypeAccess(Handlebars), layoutDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

app.listen(8080, () => {
    console.log('Server is started at port: 8080');
})

app.use('/user', userController);
app.use('/book', bookController);
app.use('/library', libraryController);