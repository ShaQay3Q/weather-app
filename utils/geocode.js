const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;

const geocode = (city, callback) => {
	const geocodeURL = "https://geocode.maps.co/search?";

	axios
		.get(geocodeURL, {
			params: {
				city: encodeURIComponent(city), // in a case someone tried to enter problematic script!
				// postalcode: "encodeURIComponent(",
				// state: "Saxony",
				// country: "Germany",
				api_key: API_KEY,
			},
		})
		.then(function (response) {
			const data = response.data;
			if (data.length !== 0) {
				callback(undefined, [data[0].lat, data[0].lon]);
			} else {
				callback(
					"Unable to find the coordinates. Try another search! - then",
					undefined
				);
			}
		})
		.catch(function (error) {
			if (error.response) {
				callback(
					"Unable to find the coordinates. Try another search!",
					undefined
				);
			} else {
				// Handles
				callback("Unable to connect to location services!", undefined);
			}
		});
};

module.exports = geocode;
