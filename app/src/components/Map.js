import React from "react";
import { connect } from "react-redux";
import {
	GoogleMap,
	Marker,
	withGoogleMap,
	withScriptjs
} from "react-google-maps";
import _ from "lodash";

import { postCurLoc } from "../actions/location";

const Config = withScriptjs(
	withGoogleMap(props => {
		const { city, weather, center, currentLatLng, onClickInfo } = props;

		return (
			<GoogleMap
				defaultZoom={8}
				defaultCenter={center || currentLatLng}
				Sea
				zoom={center ? 11 : 8}
				center={center || currentLatLng}
			>
				{!_.isEmpty(center) && (
					<Marker
						key={weather.id}
						position={center}
						label={`${city.city || ""}: ` + `${weather.main.temp}C`}
						icon={`http://openweathermap.org/img/w/${
							weather.weather[0].icon
						}.png`}
						onClick={onClickInfo}
					/>
				)}
			</GoogleMap>
		);
	})
);

class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentLatLng: {}
		};
	}

	componentDidMount = async () => {
		this.showCurrentLocation();
	};

	showCurrentLocation = async () => {
		if (navigator.geolocation) {
			await navigator.geolocation.getCurrentPosition(position => {
				this.setState(prevState => ({
					currentLatLng: {
						...prevState.currentLatLng,
						lat: position.coords.latitude,
						lng: position.coords.longitude
					}
				}));
				this.props.postCurLoc({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				});
			});
		}
	};

	render() {
		const { currentLatLng } = this.state;

		return (
			!_.isEmpty(currentLatLng) && (
				<Config
					{...this.props}
					currentLatLng={currentLatLng}
					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
						process.env.REACT_APP_GOOGLE_MAPS_KEY
					}`}
					loadingElement={
						<div
							style={{ height: `${window.innerHeight - 200}px`, width: "100%" }}
						/>
					}
					containerElement={
						<div
							style={{
								height: `${window.innerHeight - 200}px`,
								width: "100%",
								margin: "auto"
							}}
						/>
					}
					mapElement={
						<div
							style={{ height: `${window.innerHeight - 200}px`, width: "100%" }}
						/>
					}
				/>
			)
		);
	}
}

export default connect(
	null,
	{
		postCurLoc
	}
)(Map);
