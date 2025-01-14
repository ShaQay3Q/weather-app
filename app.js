const axios = require("axios");
const chalk = require("chalk");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const KEY = process.env.KEY;

const log = console.log;

const showWeather = (lat, lon) => {
	const weatherURL = "http://api.weatherapi.com/v1/current.json";
	axios
		.get(weatherURL, {
			params: {
				key: KEY,
				q: `${lat}, ${lon}`,
			},
		})
		.then(function (response) {
			//! log(response.status + " " + response.statusText);
			const data = response.data.current;
			console.log(chalk.bold.yellow.inverse("Weather"));
			log(
				`It is currently ${data.temp_c} degrees out there in ${response.data.location.name} and it feels like ${data.feelslike_c} degrees out.`
			);
		})
		.catch(function (error) {
			if (error.response) {
				// log(error.response.status + " " + error.response.statusText);
				// log(error.response.data.error.message);
				// log("error message " + error.message);
				log(chalk.red.inverse("Unable to find location."));
			} else {
				console.log(
					chalk.red.inverse("Unable to connect to the weather server!")
				);
			}
		});
};

const geoCode = (city, cb) => {
	// FORWARD GEOCODE
	const geocodeURL = "https://geocode.maps.co/search?";

	axios
		.get(geocodeURL, {
			params: {
				city: city,
				// postalcode: "04318",
				// state: "Saxony",
				// country: "Germany",
				api_key: API_KEY,
			},
		})
		.then(function (response) {
			const data = response.data;
			cb(data[0].lat, data[0].lon);
		})
		.catch(function (error) {
			if (error.response) {
				log(
					chalk.red.inverse(
						"Unable to find the coordinates. Try another search!"
					)
				);
			} else {
				// Handles
				console.log("Unable to connect to location services!");
			}
			console.log(error.response.status + " " + error.response.statusText);
		});
};

//! Only 1 API request per second
setTimeout(() => {
	geoCode("Leipzig", showWeather);
}, 1000);
setTimeout(() => {
	geoCode("Dresden", showWeather);
}, 1000);
setTimeout(() => {
	geoCode("Berlin", showWeather);
}, 1000);
