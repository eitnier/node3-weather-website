const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Define paths for Express Config
app.set('view engine', 'hbs'); //Sets the View Engine to HBS, which is an NPM to allow Express to use Handlebars
app.set('views', viewsPath) //customizing views folder and setting path to new name

//Define settings for HBS
hbs.registerPartials(partialsPath);

//Setup Static Directory to Serve static resources
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Tony Eitnier'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name: 'Tony Eitnier'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        name: 'Tony Eitnier'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter an address.'
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            console.log(error);
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide search term'
        })  
    }
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        name: 'Anthony Eitnier',
        errorMessage: 'Help article'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anthony Eitnier',
        errorMessage: 'Page'}
    );
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + ".");
});