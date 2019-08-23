const request = require("request");

const getLocation = callback => {
  request(
    { url: "https://geoip-db.com/json", json: true },
    (error, response) => {
      callback(response);
    }
  );
};

module.exports = getLocation;
