const request = require("request");

function getWeather(lat, lng, callback) {
  request(
    {
      url: `https://api.darksky.net/forecast/3d953cf42e9541a0a8cc7a5df74bb30c/${lat},${lng}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect to DarkSky servers.");
      } else if (response.statusCode === 400 || response.statusCode === 403) {
        callback("Unable to fetch weather.");
      } else {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature,
        });
      }
    }
  );
}

module.exports.getWeather = getWeather;
