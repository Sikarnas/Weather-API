const request = require('request')
const moment = require('moment')

const weather = (information, callback) => {
    const url = `https://api.darksky.net/forecast/e25d57575612bddbdad82ee34398d0c3/${information.lat},${information.long}?units=si`;
    request({url, json: true}, (error, response) => {
        const weatherJSON = response.body
        const summary = weatherJSON.daily.data[0].summary
        const temp = weatherJSON.currently.temperature
        const constProb = weatherJSON.currently.precipProbability
        const location = information.location
        const dailySummary = {summary, temp, constProb, location}
        const hourly = weatherJSON.hourly.data.slice(0,24)
        const daily = weatherJSON.daily.data.slice(0,7)

        let hourlyData = []

        hourly.forEach(element => {
            
            const hourData = {
                time: moment.unix(element.time).format("MMM DD LT"),
                temp: element.temperature,
                constProb: element.precipProbability,
                summary: element.summary
            }
            hourlyData.push(hourData)       
        });

        let dailyData = []

        daily.forEach(element => {
            
            const dayData = {
                time: moment.unix(element.time).format("MMM DD"),
                tempHigh: element.temperatureHigh,
                tempLow: element.temperatureLow,
                constProb: element.precipProbability,
                summary: element.summary
            }
            dailyData.push(dayData)       
        });

        const info = {
            dailySummary,
            hourlyData,
            dailyData
        }

        if(error) {
            callback('unable to connect to weather services', undefined)
        } else if (response.body.error) {
            callback('unable to find weather for this location', undefined)
        } else {
            callback(undefined, {
                // dailySummary,
                // hourly,
                // summaryWeek
                info
            })
        }
    })
}



module.exports = weather