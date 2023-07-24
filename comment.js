// Create web server

// Load modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create web server
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set port
const port = 3000;

// Set static files
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');

// Set routes
app.get('/', (req, res) => {
    res.render('index', {title: 'Homepage', message: 'Hello world'});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About', message: 'About page'});
});

app.get('/contact', (req, res) => {
    res.render('contact', {title: 'Contact', message: 'Contact page'});
});

app.post('/contact', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let message = req.body.message;

    let data = `${name},${email},${message}\n`;

    fs.appendFile('data.csv', data, (err) => {
        if(err) throw err;
        console.log('Saved!');
    });

    res.render('contact', {title: 'Contact', message: 'Thank you for your message'});
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


