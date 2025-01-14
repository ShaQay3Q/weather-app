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
				callback(
					undefined,
					`It is currently ${data.temp_c} degrees out there in ${location}, and it feels like ${data.feelslike_c} degrees out.
Condition: ${data.condition.text}`
				);
			} else {
				callback("Unable to load the forcast", undefined);
			}
		})
		.catch(function (error) {
			console.log(error);

			if (error.response) {
				callback("Unable to find location.", undefined);
			} else {
				callback("Unable to connect to the weather service!", undefined);
			}
		});
};

module.exports = forcast;
