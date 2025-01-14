const axios = require("axios");
const chalk = require("chalk");
const { error } = require("console");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const KEY = process.env.KEY;

const log = console.log;

// fetchWeather, acts as Callback function called by showWeather function
// it receives 2 parameters, error and data. If the error is undefined, then get the info from weather api
const fetchWeather = (error, data) => {
	console.log("error: " + error);
	console.log("data: " + data);

	if (error) {
		console.log(error);
	} else {
		const weatherURL = "http://api.weatherapi.com/v1/current.json";
		axios
			.get(weatherURL, {
				params: {
					key: KEY,
					q: `${data[0]}, ${data[1]}`,
				},
			})
			.then(function (response) {
				//! log(response.status + " " + response.statusText);
				const data = response.data.current;
				if (data) {
					console.log(chalk.bold.yellow.inverse("Weather Forcast"));
					log(
						`It is currently ${data.temp_c} degrees out there in ${response.data.location.name} and it feels like ${data.feelslike_c} degrees out.`
					);
					log(`Condition: ${data.condition.text}`);
				} else {
					console.log("Unable to load the forcast");
				}
			})
			.catch(function (error) {
				if (error.response) {
					log(chalk.red.inverse("Unable to find location."));
				} else {
					console.log(
						chalk.red.inverse("Unable to connect to the weather server!")
					);
				}
			});
	}
};

const showWeather = (city, cb) => {
	const geocodeURL = "https://geocode.maps.co/search?";

	axios
		.get(geocodeURL, {
			params: {
				city: encodeURIComponent(city), // in a case someone tried to enter problematic script!
				// postalcode: "04318",
				// state: "Saxony",
				// country: "Germany",
				api_key: API_KEY,
			},
		})
		.then(function (response) {
			const data = response.data;
			if (data.length !== 0) {
				cb(undefined, [data[0].lat, data[0].lon]);
			} else {
				cb(
					"Unable to find the coordinates. Try another search! - then",
					undefined
				);
			}
		})
		.catch(function (error) {
			if (error.response) {
				cb("Unable to find the coordinates. Try another search!", undefined);
			} else {
				// Handles
				cb("Unable to connect to location services!");
			}
		});
};

showWeather("Leipig", fetchWeather);

// //! Only 1 API request per second
setTimeout(() => {
	showWeather("Leipzig", fetchWeather);
}, 1000);
setTimeout(() => {
	showWeather("Dresden", fetchWeather);
}, 1000);
setTimeout(() => {
	showWeather("Berlin", fetchWeather);
}, 1000);
