const request = require('request');

//Generate your Weather API Key And Use it below From Forecast.io
const WeatherAPI = '25f3e83d0731fcf25e0439f54a093190';

var getWeather = (lati, long, callback) => {

    request({
        url: `https://api.darksky.net/forecast/${WeatherAPI}/${lati},${long}`,
        json: true,
    }, (error, response, body) => {
        if(error)
            {
                callback('Unable to connect Forecast.io server.', undefined);
            }
            else if(response.statuscode === 400)
            {
                callback('Unable to fetch weather.', undefined);
            }
            else if(!error)
            {
                callback(undefined, ("it's " + body.currently.summary + " and Temperature is " + body.currently.temperature)
                );
            }
    });

};

module.exports.getWeather = getWeather;