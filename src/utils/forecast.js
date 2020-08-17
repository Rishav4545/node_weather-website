const request = require('request')


const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8f408e1c16365b655dda7463a9a75826&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect!', undefined)
        }
        else if(body.error) {
            callback('Unable to find location!', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + '. But it feels like ' + body.current.feelslike)
        }
    })
}

module.exports = forecast


