const axios = require("axios");
require("dotenv").config();

const KEY = process.env.KEY;
// // ! getting propertes of dataInput that I use them here
// const forcast = ({ latitute, longitute } = dataInput, callback) => {
const forcast = (latitute, longitute, callback) => {
	const weatherURL = "http://api.weatherapi.com/v1/current.json";
	axios
		.get(weatherURL, {
			params: {
				key: KEY,
				q: `${encodeURIComponent(latitute)}, ${encodeURIComponent(longitute)}`,
			},
		})
		.then(function (response) {
			// Validate response structure
			if (!response.data?.current || !response.data?.location) {
				throw new Error("Invalid response from weather service.");
			}
			//! Object Destructuring - before passing down the "display_name"
			// extract properties (current and location) from the response.data object.
			// and assigne them to "data" and "location"
			const { current: data, location } = response.data;
			const { temp_c, feelslike_c, condition } = data;
			const { name, region, country } = location;
			const locationDetails = `${name} (${region}, ${country})`;

			callback(
				undefined,
				`It is currently ${temp_c} degrees out there in ${locationDetails}, and it feels like ${feelslike_c} degrees out.
Condition: ${condition.text}`
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
