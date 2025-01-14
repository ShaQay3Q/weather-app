const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");

// forcast(51.3397, 12.3731, (error, data) => {
forcast(6564.8, 76576, (error, data) => {
	console.log("FIRCAST");

	console.log(error);
	console.log(data);
});

geocode("Leipzig", (error, data) => {
	console.log("GEOCODE");
	console.log(error);
	console.log(data);
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
