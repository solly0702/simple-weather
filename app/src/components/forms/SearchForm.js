import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
	Paper,
	Grid,
	Typography,
	FormControl,
	Button
} from "@material-ui/core";
import _ from "lodash";

import Dropdown from "../dropdown/Dropdown";
import {
	getCountries,
	getRegions,
	getCities,
	postFav
} from "../../actions/location";

const styles = theme => ({
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
			3
		)}px`,
		backgroundColor: "#FEDD90"
	}
});

class SearchForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isManuOpen: false,
			isLoading: false,
			country: "",
			region: "",
			city: "",
			errors: {}
		};
	}

	onMenuClose = () => this.setState({ isManuOpen: false });

	onChangeDropdown = (v, e) => {
		const { selectedCity } = this.props;

		if (e.name === "city" && !_.isEmpty(v)) {
			selectedCity(v.value);
		}

		if (e.name === "region") {
			this.setState({ city: "" });
		}

		if (e.name === "country") {
			this.setState({ region: "", city: "" });
		}

		return this.setState({ [e.name]: v });
	};

	onOpenCountry = async () => {
		const { isManuOpen } = this.state;
		const { getCountries } = this.props;

		if (!isManuOpen && _.isEmpty(this.props.countries)) {
			this.setState({
				isLoading: true,
				isManuOpen: true,
				errors: { country: "" }
			});
			try {
				this.setState({ isLoading: true });

				await getCountries();

				this.setState({ isLoading: false });
			} catch (err) {
				this.setState({
					isLoading: false,
					errors: { country: "Errors with countries endpoint" }
				});
			}
		}
	};

	onOpenRegion = async () => {
		const { isManuOpen, country } = this.state;
		const { getRegions } = this.props;

		if (_.isEmpty(country)) {
			return this.setState({
				errors: {
					region: "Required Country Field"
				}
			});
		}

		if (!isManuOpen) {
			try {
				this.setState({
					isLoading: true,
					isManuOpen: true,
					errors: { city: "" }
				});

				await getRegions(country.value);

				this.setState({ isLoading: false });
			} catch (err) {
				this.setState({
					isLoading: false,
					errors: { region: "Errors with regions endpoint" }
				});
			}
		}
	};

	onOpenCity = async () => {
		const { isManuOpen, region } = this.state;
		const { getCities } = this.props;

		if (_.isEmpty(region)) {
			return this.setState({
				errors: {
					city: "Required Region Field"
				}
			});
		}

		if (!isManuOpen) {
			try {
				this.setState({
					isLoading: true,
					isManuOpen: true,
					errors: { city: "" }
				});

				await getCities(region.value);

				this.setState({ isLoading: false });
			} catch (err) {
				this.setState({
					isLoading: false,
					errors: { city: "Errors with cities endpoint" }
				});
			}
		}
	};

	onClickFav = () => {
		this.props.postFav(this.state.city);
	};

	render() {
		const { isLoading, errors, country, region, city } = this.state;
		const { classes, onClickCurLoc } = this.props;

		return (
			<Paper className={classes.paper}>
				<Grid container>
					<Grid item xs={12} align="center">
						<Grid container>
							<Grid item xs={6}>
								<Typography
									component="h4"
									variant="h5"
									align="left"
									styles={{ marginLeft: "2rem" }}
								>
									Search Weather
								</Typography>
							</Grid>

							<Grid item xs={6} align="right">
								<Button
									variant="contained"
									style={{
										backgroundColor: "#3470DA",
										color: "white"
									}}
									className={classes.button}
									onClick={onClickCurLoc}
								>
									Current Location
								</Button>
								{/* {!_.isEmpty(city) && ( */}
								<Button
									variant="contained"
									style={{
										backgroundColor: "#75A652",
										color: "white",
										marginLeft: "1rem"
									}}
									className={classes.button}
									onClick={this.onClickFav}
								>
									Save as Favorite
								</Button>
								{/* )} */}
							</Grid>
						</Grid>

						<form className={classes.form}>
							<Grid container>
								<Grid item xs={12} md={4}>
									<FormControl margin="normal" fullWidth>
										<Dropdown
											required
											isMulti={false}
											label={"Country"}
											name="country"
											isLoading={isLoading}
											onMenuClose={this.onMenuClose}
											onMenuOpen={this.onOpenCountry}
											onChange={this.onChangeDropdown}
											options={this.props.countries}
											value={country}
											error={errors.country}
										/>
									</FormControl>
								</Grid>

								<Grid item xs={12} md={4}>
									<FormControl margin="normal" fullWidth>
										<Dropdown
											required
											isMulti={false}
											label={"Region"}
											name="region"
											isLoading={isLoading}
											onMenuClose={this.onMenuClose}
											onMenuOpen={this.onOpenRegion}
											onChange={this.onChangeDropdown}
											options={this.props.regions}
											value={region}
											error={errors.region}
										/>
									</FormControl>
								</Grid>

								<Grid item xs={12} md={4}>
									<FormControl margin="normal" fullWidth>
										<Dropdown
											required
											isMulti={false}
											label={"City"}
											name="city"
											isLoading={isLoading}
											onMenuClose={this.onMenuClose}
											onMenuOpen={this.onOpenCity}
											onChange={this.onChangeDropdown}
											options={this.props.cities}
											value={city}
											error={errors.city}
										/>
									</FormControl>
								</Grid>
							</Grid>
						</form>
					</Grid>
				</Grid>
			</Paper>
		);
	}
}

function mapStateToProps({ countries, regions, cities }) {
	return {
		countries,
		regions,
		cities
	};
}

SearchForm.propTypes = {
	classes: PropTypes.shape({}).isRequired,
	countries: PropTypes.shape({}).isRequired,
	regions: PropTypes.shape({}).isRequired,
	cities: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(
	connect(
		mapStateToProps,
		{
			getCountries,
			getRegions,
			getCities,
			postFav
		}
	)(SearchForm)
);
