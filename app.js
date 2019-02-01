// https://api.tomtom.com/search/2/geocode/1301 lombard street philadelpha.json?countrySet=US&key=MB7kVTlPdyrtUtdD3VQrCcvlD0z57apD
// https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia&key=AIzaSyC5nuGPwwbaF1FY_yhR9OTV9eVH-ivO2sw
// http://www.mapquestapi.com/geocoding/v1/address?key=p2k6WkOaCUCXd0CQEwwRUhI9Fk2o1HyH&location=1301%20lombard%20street%20philadelphia
const yargs = require("yargs");
const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getWeather(results.Latitude, results.Longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
      }
    });
  }
});
