const request = require('request')

const reverseGeo = (lat, long, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=pk.eyJ1IjoiYXVyaXRvejk1IiwiYSI6ImNqeDd4OGpvYzBiZjczbnBwdm5lNnQweDkifQ.pJweepH9HzUmvkiIIwTANA`
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('unable to connect to location services', undefined)
        } else if (response.body.features.length === 0) {
            callback('unable to find location, try another search', undefined)
        } else {
            callback(undefined, {
                city: response.body.features[0].text
            })
        }
    })
}

module.exports = reverseGeo