const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__filename)
const app = express()

const path1 = path.join(__dirname, '../public')
const path2 = path.join(__dirname, '../templates/views')
const path3 = path.join(__dirname, '../templates/partials')

app.use(express.static(path1))

app.set('view engine', 'hbs') // This is handel bars...
app.set('views', path2)
hbs.registerPartials(path3)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rishav Basak'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me!',
        name: 'Rishav Basak'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        text: 'You ask we answer!',
        title: 'Contact us on ___!',
        name: 'Rishav Basak'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a search term',
        })
    }

    geocode(req.query.address, (error, {place, latitude, longitude} = {}) => { 
        if(error){
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                place,
                address: req.query.address,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term',
        })
    }

    console.log(req.query.search)
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        text: 'Help article not found',
        name: 'Rishav Basak'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        text: '404 error',
        name: 'Rishav Basak'
    })
})

app.listen(3000, () => {
    console.log('Server is up on 3000')
})




