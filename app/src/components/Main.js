import React, { Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import api from "../api";
import { postFav } from "../actions/location";
import SearchForm from "./forms/SearchForm";
import Favorite from "./Favorite";
import Map from "./Map";
import InfoWindow from "./InfoWindow";

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: {},
			favorite: {},
			weather: {}
		};
	}

	componentDidMount = () => {
		this.props.postFav();
	};

	selectedCity = async city => {
		try {
			const weather = await api.getWeather(city);
			this.setState({ city, weather });
		} catch (err) {}
	};

	onClickCurLoc = () => {
		this.selectedCity(this.props.curloc);
	};

	render() {
		const { city, favorite, weather } = this.state;
		const { favorites } = this.props;
		let center = null;

		if (!_.isEmpty(weather)) {
			center = {
				lat: weather.coord.lat,
				lng: weather.coord.lon
			};
		}

		return (
			<Fragment>
				<SearchForm
					selectedCity={this.selectedCity}
					onClickCurLoc={this.onClickCurLoc}
				/>

				{!_.isEmpty(favorites) && (
					<Favorite
						favorite={favorite}
						favorites={favorites}
						selectedCity={this.selectedCity}
						onClickDelete={this.onClickDelete}
					/>
				)}

				{!_.isEmpty(weather) && <InfoWindow city={city} weather={weather} />}

				<Map center={center} city={city} weather={weather} />
			</Fragment>
		);
	}
}

function mapStateToProps({ favorites, curloc }) {
	return {
		favorites,
		curloc
	};
}

export default connect(
	mapStateToProps,
	{
		postFav
	}
)(Main);
