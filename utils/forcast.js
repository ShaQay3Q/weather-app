const axios = require("axios");
require("dotenv").config();

const KEY = process.env.KEY;

const forcast = (lat, lon, cb) => {
	if (!!lat && !!lon) {
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
					cb(
						undefined,
						`It is currently ${data.temp_c} degrees out there in ${location}, and it feels like ${data.feelslike_c} degrees out.
Condition: ${data.condition.text}`
					);
				} else {
					cb("Unable to load the forcast", undefined);
				}
			})
			.catch(function (error) {
				if (error.response) {
					cb("Unable to find location.", undefined);
				} else {
					cb("Unable to connect to the weather server!", undefined);
				}
			});
	}
};

module.exports = forcast;
