const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/40c9c898a29632fe79c5867351fb32e8/' + latitude + ',' + longitude;

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service.", undefined);
        } else if (body.error) {
            callback("Unable to find location.", undefined);
        } else {
            console.log(body.currently)
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees outside. There is a ' + body.currently.precipProbability + '% chance of rain. The UV index is ' + body.currently.uvIndex + ".");
        }
    })
}

module.exports = forecast;