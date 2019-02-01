// https://api.tomtom.com/search/2/geocode/1301 lombard street philadelpha.json?countrySet=US&key=MB7kVTlPdyrtUtdD3VQrCcvlD0z57apD
// https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia&key=AIzaSyC5nuGPwwbaF1FY_yhR9OTV9eVH-ivO2sw
// http://www.mapquestapi.com/geocoding/v1/address?key=p2k6WkOaCUCXd0CQEwwRUhI9Fk2o1HyH&location=1301%20lombard%20street%20philadelphia
const yargs = require("yargs");
const axios = require("axios");
const key = "MB7kVTlPdyrtUtdD3VQrCcvlD0z57apD";

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "address to fethch weather for.",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://api.tomtom.com/search/2/geocode/${encodedAddress}.json?key=${key}`;

axios.get(geocodeUrl).then(response => {
  if (response.data.summary.numResults === 0) {
    throw new Error('Unable to find that address.');
  }

  var lat = response.data.results[0].position.lat;
  var lng = response.data.results[0].position.lon;
  var weatherUrl = `https://api.darksky.net/forecast/3d953cf42e9541a0a8cc7a5df74bb30c/${lat},${lng}`;
  console.log(response.data.results[0].address.freeformAddress);
  return axios.get(weatherUrl);
}).then(response => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;

  console.log(`It's currently ${temperature}, It feels like ${apparentTemperature}.`)

}).catch(e => {
  if (e.code === "ENOTFOUND") {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});