import _ from "lodash";
import {
	GET_COUNTRIES,
	GET_REGIONS,
	GET_CITIES,
	POST_FAVORITE,
	DELETE_FAVORITE,
	POST_CUR_LOC
} from "../types";
import api from "../api";

// export const getCountries = data => {
// 	GET_COUNTRIES, countires;
// };

// export const reqCountires = params => dispatch =>
// 	api.get("country.list.min.json").then(countires => {
// 		console.log(countires);
// 		return dispatch(getCountries(countries));
// 	});

export const getCountries = () => async dispatch => {
	try {
		// const countries = await api.getLoc({ search: "countries" });

		const countries = await api.getLocJsonP({ search: "countries" });

		return dispatch({
			type: GET_COUNTRIES,
			countries
		});
	} catch (err) {
		console.log(err);
	}
};

export const getRegions = params => async dispatch => {
	try {
		const regions = await api.getLocJsonP({ ...params, search: "regions" });

		return dispatch({
			type: GET_REGIONS,
			regions
		});
	} catch (err) {
		console.log(err);
	}
};

export const getCities = params => async dispatch => {
	try {
		const cities = await api.getLocJsonP({
			...params,
			search: "cities"
		});

		return dispatch({
			type: GET_CITIES,
			cities
		});
	} catch (err) {
		console.log(err);
	}
};

export const postFav = city => dispatch => {
	const cache = JSON.parse(localStorage.getItem("favorites"));
	const newCache = cache === null ? {} : cache;

	if (!_.isEmpty(city)) {
		const favorites = { ...newCache, [city.value.latitude]: city.value };
		localStorage.favorites = JSON.stringify(favorites);

		return dispatch({
			type: POST_FAVORITE,
			favorites
		});
	}

	return dispatch({
		type: POST_FAVORITE,
		favorites: newCache
	});
};

export const deleteFav = favorite => dispatch => {
	const cache = JSON.parse(localStorage.getItem("favorites"));

	delete cache[favorite.latitude];

	if (!_.isEmpty(cache)) {
		const favorites = JSON.stringify(cache);

		localStorage.favorite = favorites;
	} else {
		localStorage.removeItem("favorites");
	}

	return dispatch({
		type: DELETE_FAVORITE,
		favorite
	});
};

export const postCurLoc = curloc => dispatch =>
	dispatch({ type: POST_CUR_LOC, curloc });
