import { combineReducers } from "redux";
import {
	GET_COUNTRIES,
	GET_REGIONS,
	GET_CITIES,
	POST_FAVORITE,
	DELETE_FAVORITE,
	POST_CUR_LOC
} from "../types";
import _ from "lodash";

export default combineReducers({
	countries: (state = {}, action = {}) => {
		switch (action.type) {
			case GET_COUNTRIES:
				return { ...state, ..._.mapKeys(action.countries, "code") };
			default:
				return state;
		}
	},
	regions: (state = {}, action = {}) => {
		switch (action.type) {
			case GET_REGIONS:
				return { ...state, ..._.mapKeys(action.regions, "region") };
			default:
				return state;
		}
	},
	cities: (state = {}, action = {}) => {
		switch (action.type) {
			case GET_CITIES:
				return { ...state, ..._.mapKeys(action.cities, "latitude") };
			default:
				return state;
		}
	},
	favorites: (state = {}, action = {}) => {
		switch (action.type) {
			case POST_FAVORITE:
				return { ...state, ...action.favorites };
			case DELETE_FAVORITE:
				return _.omit(state, [action.favorite.latitude]);
			default:
				return state;
		}
	},
	curloc: (state = {}, action = {}) => {
		switch (action.type) {
			case POST_CUR_LOC:
				return { ...action.curloc };
			default:
				return state;
		}
	}
});
