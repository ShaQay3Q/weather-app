const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");

// Gets user input from CL
const input = process.argv[2];

if (!input) {
	console.log("Please provide a city name!");
} else {
	//! Callback Chaining
	// Chain multiple callbacks to do multiple things in specific order

	// geocode(input, (error, { latitute, longitute, location }) => { //! corect
	// geocode(input, (error, { latitute, longitute, location } = data) => { //! OR
	geocode(input, (error, { latitute, longitute, location } = {}) => { //! in a case of error, pass down and empty object
		//! better
		// geocode(input, (error, data) => {
		console.log("GEOCODE");
		if (error) {
			return console.log(error);
		}
		forcast(latitute, longitute, (error, focastData) => {
			// forcast(({ location } = data), (error, focastData) => {
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
