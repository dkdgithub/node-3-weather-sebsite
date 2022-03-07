const request = require("request");

const forecast = (lat, lon, callback) => {
  // make changes in url (with wrong lat-lon value) order to generate error

  //   Weatherstack api
  const url =
    "http://api.weatherstack.com/current?access_key=8826099a2eea56e7b500fb9c18c44cc9&query=" +
    lat +
    "," +
    lon +
    "&units=f";

  request({ url, json: true }, (error, { body } = {}) => {
    //Below is the code after we adding more options to the 'option section' which is parsing of JSON string otherwise we need to parse it separetly by using JSON.PARSE
    // Handling error in request
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}: The current temprature is ${body.current.temperature} degrees out, but it feels like ${body.current.feelslike}. The humidity is ${body.current.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
