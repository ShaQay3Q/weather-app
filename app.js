const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");

// Gets user input from CL
const input = process.argv[2];

if (!input) {
	console.log("Please provide a city name!");
} else {
	//! Callback Chaining
	// Chain multiple callbacks to do multiple things in specific order

	geocode(input, (error, data) => {
		console.log("GEOCODE");
		if (error) {
			return console.log(error);
		}
		// forcast(51.3397, 12.3731, (error, data) => {
		forcast(data.latitute, data.longitute, (error, focastData) => {
			console.log("FIRCAST");
			if (error) {
				return console.log(error);
			}

			console.log(data.location);
			console.log(focastData);
		});
	});
}

