const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const { create } = require('express-handlebars'); // Correct import
const path = require("path");

app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

// Template engine
const hbs = create({ // Create an instance of Handlebars
    extname: '.hbs', // Specify the extension (optional, but good practice)
    layoutsDir: path.join(__dirname, 'resources/views/layouts'), // Layouts directory
    partialsDir: path.join(__dirname, 'resources/views/partials'), // Partials directory
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
    }
});

app.engine('hbs', hbs.engine); // Use the engine property
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
    return res.render('home');
});

app.get('/news', (req, res) => {
    return res.render('news');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});