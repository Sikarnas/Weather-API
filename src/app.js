const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const weather = require('../utils/weather')
const getLocation = require('../utils/location')
const reverseGeo = require('../utils/reverseGeo')

// define paths to Express config
const app = express()
const port = process.env.PORT || 3001

// setup express paths
const publicDir = (path.join(__dirname, '../public'))
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req,res) => {

    // getLocation((ipLocation) => {
    //     // res.send(ipLocation)
    //     console.log(ipLocation)
    // })

    res.render('index',{
        title: 'Weather',
        name: 'Aurutis'
    })
})


// navigator.geolocation.getCurrentPosition(function(position){
//     console.log(position)
// })

// app.get('/help', (req,res) => {
//     res.render('help',{
//         title: 'Help page',
//         name: 'Aurutis'
//     })
// })

// app.get('/about', (req,res) => {
//     res.render('about',{
//         title: 'About page',
//         name: 'Aurutis'
//     })
// })


app.get('/weather',(req,res) => {

    const getWeather = (location) => geocode(location, (error,data = {}) => {
        if(error) {
            return res.send('Error: you must provide an acceptable location')
        }
        weather(data, (error,{summary, location, temp, constProb} = {}) => {
            if(error) {
                return res.send('Error: you must provide an acceptable location')
            }
            // res.send(`Today in ${location} it's ${temp} C and there is ${constProb} % chance of rain`)
            res.send({summary, location,temp, constProb})
        })
    })

    if(!req.query.lat && !req.query.long && !req.query.location) {
        getLocation((callback) => getWeather(callback.body.city))
        return
    } else if(req.query.lat && req.query.long && !req.query.location ) {

        reverseGeo(req.query.lat, req.query.long, (error, result) => {
            if(error) {
                return res.send('Error with location services')
            }
            getWeather(result.city)
            return
        })

        // weather(data, (error,{summary, location, temp, constProb} = {}) => {
        //     if(error) {
        //         return res.send('Error: you must provide an acceptable location')
        //     }
        //     // res.send(`Today in ${location} it's ${temp} C and there is ${constProb} % chance of rain`)
        //     res.send({summary, location,temp, constProb})
        // })
        return
    }
    getWeather(req.query.location)
    
})

// app.get('/products',(req,res) => {
//     if(!req.query.search) {
//         return res.send({
//             error: 'you must provide a search term'
//         })
//     }
//     console.log(req.query)
//     res.send({
//         products: []
//     })
// })

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Error',
        name: 'Aurutis',
    })
})

app.listen(port, () => {
    console.log('server has started')
})