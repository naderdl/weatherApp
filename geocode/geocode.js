const request = require("request");
const key = "MB7kVTlPdyrtUtdD3VQrCcvlD0z57apD";

function geocodeAddress(address, callback) {
  var encodedAddress = encodeURIComponent(address);
  request(
    {
      url: `https://api.tomtom.com/search/2/geocode/${encodedAddress}.json?key=${key}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect to tomtom servers.");
      } else if (body.summary.numResults === 0) {
        callback("Unable to find address.");
      } else {
        callback(undefined, {
          address: body.results[0].address.freeformAddress,
          Latitude: body.results[0].position.lat,
          Longitude: body.results[0].position.lon
        });
      }
    }
  );
}

module.exports = {
  geocodeAddress
};
