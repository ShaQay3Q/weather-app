const axios = require("axios");
const chalk = require("chalk");
require("dotenv").config();
const geocode = require("./utils/geocode.js");

const KEY = process.env.KEY;

const log = console.log;

// fetchWeather, acts as Callback function called by showWeather function
// it receives 2 parameters, error and data. If the error is undefined, then get the info from weather api
const fetchWeather = (error, data) => {
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
				const location =
					response.data.location.name +
					" (" +
					response.data.location.region +
					", " +
					response.data.location.country +
					")";
				if (data) {
					console.log(chalk.bold.yellow.inverse("Weather Forcast"));
					log(
						`It is currently ${data.temp_c} degrees out there in ${location}, and it feels like ${data.feelslike_c} degrees out.`
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

geocode("tehran", fetchWeather);

// //! Only 1 API request per second
setTimeout(() => {
	geocode("Leipzig", fetchWeather);
}, 1000);
setTimeout(() => {
	geocode("Dresden", fetchWeather);
}, 1000);
setTimeout(() => {
	geocode("Berlin", fetchWeather);
}, 1000);
