const axios = require("axios");
require("dotenv").config();

const KEY = process.env.KEY;

const forcast = (lat, lon, callback) => {
	const weatherURL = "http://api.weatherapi.com/v1/current.json";
	axios
		.get(weatherURL, {
			params: {
				key: KEY,
				q: `${encodeURIComponent(lat)}, ${encodeURIComponent(lon)}`,
			},
		})
		.then(function (response) {
			// Validate response structure
			if (!response.data?.current || !response.data?.location) {
				throw new Error("Invalid response from weather service.");
			}
			//! Object Destructuring
			// extract properties (current and location) from the response.data object.
			// and assigne them to "data" and "location"
			const { current: data, location: location } = response.data;
			const locationDetails = `${location.name} (${location.region}, ${location.country})`;

			callback(
				undefined,
				`It is currently ${data.temp_c} degrees out there in ${locationDetails}, and it feels like ${data.feelslike_c} degrees out.
Condition: ${data.condition.text}`
			);
		})
		.catch(function (error) {
			// Handles errors from the API
			if (error.response) {
				callback("Unable to find location.", undefined);
				// Handles validation errors
			} else if (error.message) {
				callback(error.message, undefined);
				// Handles connection or unexpected errors
			} else {
				callback("Unable to connect to the weather service!", undefined);
			}
		});
};

module.exports = forcast;
