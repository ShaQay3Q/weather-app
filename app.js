const request = require("request");
const postmanRequest = require("postman-request");
const axios = require("axios");
const chalk = require("chalk");
const { error } = require("console");
// import chalk from "chalk.mjs";

const log = console.log;

const url =
	"https://api.weatherstack.com/current?access_key=6e20e858c69a769813dfac2268cf0ad4&query=51.300,12.33";

// request(url, function (error, response, body) {
// 	log(chalk.bold.yellow.inverse("Request"));
// 	log(chalk.red.inverse("error:"));
// 	console.error(error); // Print the error if one occurred
// 	log(chalk.blue.inverse("statusCode:"));
// 	console.log(response && response.statusCode); // Print the response status code if a response was received
// 	log(chalk.green.inverse("body:"));
// 	console.log(body); // Print the HTML for the Google homepage.
// });

// request({url: url, json: true}, error, response)
// request(url + "&units=f", { json: true }, (error, response, body) => {
// 	log(chalk.bold.yellow.inverse("Request"));
// 	// const data = JSON.parse(body); //! by setting json to true, there is no need for parsing the eresponse

// 	// console.log(response.body.location);
// 	const data = body.current;
// 	console.log(
// 		`It is currently ${data.temperature} degrees out there in Leipzig and it feels like ${data.feelslike} degrees out.`
// 	);

// 	// log(data.current);
// });

// postmanRequest(url, function (error, response, body) {
// console.log(chalk.bold.yellow.inverse("PostmanRequest"));
// 	log(chalk.red.inverse("error:"));
// 	console.log(error); // Print the error if one occurred
// 	log(chalk.blue.inverse("statusCode:"));
// 	console.log(response && response.statusCode); // Print the response status code if a response was received
// 	log(chalk.green.inverse("body:"));
// 	console.log(body); // Print the HTML for the Google homepage.
// });

// axios
// 	.get("https://api.weatherstack.com/current", {
// 		params: {
// 			access_key: "6e20e858c69a769813dfac2268cf0ad4",
// 			query: "51.300,12.33",
// 			units: "f",
// 		},
// 	})
// 	.then(function (response) {
// 		const data = response.data.current;
// 		console.log(chalk.bold.yellow.inverse("Axios"));
// 		log(response.data.request);
// 		log(
// 			`It is currently ${data.temperature} degrees out there in Leipzig and it feels like ${data.feelslike} degrees out.`
// 		);

// 		// console.log(response.data.current);
// 	})
// 	.catch(function (error) {
// 		console.log(error);
// 	})
// 	.finally(function () {
// 		// always executed
// 	});

// city = "Leipzig";
// postalcode = "04318";
// state = "Saxony";
// country = "Germany";
// api_key = "67824d9e1c3c5071216860wzh3dc463";

// FORWARD GEOCODE
const geocodeURL = "https://geocode.maps.co/search?";
axios
	.get(
		// `https://geocode.maps.co/search?city=${city}&state=${state}&postalcode=${postalcode}&country=${country}&api_key=${api_key}`,
		geocodeURL,
		{
			params: {
				city: "Leipzig",
				// postalcode: "04318",
				// state: "Saxony",
				// country: "Germany",
				api_key: "67824d9e1c3c5071216860wzh3dc463",
			},
		}
	)
	.then(function (response) {
		const data = response.data;
		console.log(chalk.bold.yellow.inverse("Axios - Geoloction"));
		// if (data.length === 1) {
		console.log(
			chalk.inverse.bold(`coordinates for the ${data[0].display_name} is:`)
		);

		log(chalk.green("latitute: ") + data[0].lat);
		log(chalk.green("longitute: ") + data[0].lon);
		// } else {
		// log(chalk.red.inverse("Enter the address more specifically!"));
		// }

		// console.log(response.data.current);
	})
	.catch(function (error) {
		console.log("It didn't work!");
	})
	.finally(function () {});

// const options = {
// 	method: "GET",
// 	url: "https://api.weatherstack.com/current?access_key=6e20e858c69a769813dfac2268cf0ad4",
// 	params: {
// 		query: "51.300,12.33",
// 		units: "f",
// 	},
// };

// try {
// 	const response = await axios.request(options);
// 	log(response.data);
// } catch (e) {
// 	getWeather;
// }
