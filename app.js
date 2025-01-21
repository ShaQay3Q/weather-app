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
		forcast(({ location } = data), (error, focastData) => {
			//! sending data as object down as first argument, just use the location here!
			console.log("FIRCAST");
			if (error) {
				return console.log(error);
			}

			console.log(location);
			console.log(focastData);
		});
	});
}
