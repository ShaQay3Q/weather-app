const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");

//! Callback Chaining
// Chain multiple callbacks to do multiple things in specific order

geocode("Leipzig", (error, data) => {
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

// geocode("tehran", forcast);

// //! Only 1 API request per second
// setTimeout(() => {
// 	forcast(geocode("leipzig"));
// }, 1000);
// setTimeout(() => {
// 	geocode("Dresden", forcast);
// }, 1000);
// setTimeout(() => {
// 	geocode("Berlin", forcast);
// }, 1000);
