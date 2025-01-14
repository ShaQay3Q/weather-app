require("dotenv").config();
const geocode = require("./utils/geocode.js");
const forcast = require("./utils/forcast.js");

forcast(51.3397, 12.3731, (error, data) => {
	// forcast(-75.7088, 44.1545, (error, data) => {
	console.log(error);
	console.log(data);
});

geocode("tehran", forcast);

// //! Only 1 API request per second
setTimeout(() => {
	geocode("Leipzig", forcast);
}, 1000);
setTimeout(() => {
	geocode("Dresden", forcast);
}, 1000);
setTimeout(() => {
	geocode("Berlin", forcast);
}, 1000);
