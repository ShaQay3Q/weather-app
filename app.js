const request = require("request");
const postmanRequest = require("postman-request");
const axios = require("axios");
const chalk = require("chalk");
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

request({ url: url }, (error, response, body) => {
	log(chalk.bold.yellow.inverse("Request"));
	const data = JSON.parse(body);

	console.log(response.body);
	log(body);
	log(data.current);
});

// postmanRequest(url, function (error, response, body) {
// console.log(chalk.bold.yellow.inverse("PostmanRequest"));
// 	log(chalk.red.inverse("error:"));
// 	console.log(error); // Print the error if one occurred
// 	log(chalk.blue.inverse("statusCode:"));
// 	console.log(response && response.statusCode); // Print the response status code if a response was received
// 	log(chalk.green.inverse("body:"));
// 	console.log(body); // Print the HTML for the Google homepage.
// });

axios
	.get("https://api.weatherstack.com/current", {
		params: {
			access_key: "6e20e858c69a769813dfac2268cf0ad4",
			query: "51.300,12.33",
		},
	})
	.then(function (response) {
		console.log(chalk.bold.yellow.inverse("Axios"));
		console.log(response.data.current);
	})
	.catch(function (error) {
		console.log(error);
	})
	.finally(function () {
		// always executed
	});
