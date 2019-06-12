import axios from "axios";
import _ from "lodash";
import fetchJsonp from "fetch-jsonp";

export default {
	getLoc: async params => {
		// BASEURL
		const baseURL = "http://battuta.medunes.net/api";
		let url = "";

		// setup api
		if (params.search === "countries") {
			url = `${baseURL}/country/all`;
		} else if (params.search === "regions") {
			url = `${baseURL}/region/${params.code}/all`;
		} else {
			url = `${baseURL}/city/${params.country}/search/?region=${params.region}`;
		}

		// setup key
		if (params.search !== "cities") {
			axios.defaults.baseURL = `${url}/?key=${
				process.env.REACT_APP_LOCATION_API_KEY
			}`;
		} else {
			axios.defaults.baseURL = `${url}&key=${
				process.env.REACT_APP_LOCATION_API_KEY
			}`;
		}

		try {
			const { data } = await axios.get();

			// if (params.search === "cities") {
			// 	let cities = [];

			// 	for (const d of data) {
			// 		axios.defaults.baseURL = `${baseURL}/city/${
			// 			d.country
			// 		}/search/?region=${d.region}&key=${
			// 			process.env.REACT_APP_LOCATION_API_KEY
			// 		}`;

			// 		// axios.defaults.baseURL = `${baseURL}/city/search/?region=${
			// 		// 	d.region
			// 		// }&key=${process.env.REACT_APP_LOCATION_API_KEY}`;

			// 		const { data: city } = await axios.get();
			// 		cities = [...cities, ...city];
			// 	}
			// 	return _.orderBy(cities, "city", ["asc"]);
			// }

			return _.orderBy(data, ["name", "region", "city"], ["asc"]);
		} catch (err) {
			console.log(err);
			// TODO: ADDING ERROR MESSAGES
		}
	},
	getLocJsonP: params => {
		const baseURL = "http://battuta.medunes.net/api";
		let url = "";

		// setup api
		if (params.search === "countries") {
			url = `${baseURL}/country/all`;
		} else if (params.search === "regions") {
			url = `${baseURL}/region/${params.code}/all`;
		} else {
			url = `${baseURL}/city/${params.country}/search/?region=${params.region}`;
		}

		// setup key
		if (params.search !== "cities") {
			url = `${url}/?key=${process.env.REACT_APP_LOCATION_API_KEY}`;
		} else {
			url = `${url}&key=${process.env.REACT_APP_LOCATION_API_KEY}`;
		}

		return fetchJsonp(`${url}&callback=?`)
			.then(res => res.json())
			.catch(err => {
				console.log("location parsing failed", err);
				// TODO: error popup
			});
	},
	getWeather: async params => {
		axios.defaults.baseURL = `http://api.openweathermap.org/data/2.5/weather?lat=${
			params.latitude
		}&lon=${params.longitude}&units=metric&appid=${
			process.env.REACT_APP_WEATHER_API_KEY
		}`;

		try {
			const { data } = await axios.get();

			return data;
		} catch (err) {
			console.log(err, "location parsing failed");
		}
	}
};
