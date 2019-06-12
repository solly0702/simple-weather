import React, { Fragment } from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";

const styles = theme => ({
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
			3
		)}px`,
		backgroundImage: "linear-gradient(to right, #c2e59c, #64b3f4)"
	}
});

const InfoWindow = ({ classes, city, weather }) => {
	return (
		<Paper className={classes.paper}>
			<Grid container alignItems="center">
				<Grid item xs={12}>
					<Typography
						component="h5"
						variant="h6"
						align="left"
						styles={{ marginLeft: "2rem" }}
					>
						Details
					</Typography>
				</Grid>
				{!_.isEmpty(city.city) && (
					<Fragment>
						<Grid item xs={4}>
							<Typography component="p" variant="body1" align="center">
								Country: {city.country.toUpperCase()}
							</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography component="p" variant="body1" align="center">
								Region: {city.region}
							</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography component="p" variant="body1" align="center">
								City: {city.city}
							</Typography>
						</Grid>
					</Fragment>
				)}
				<Grid item xs={4}>
					<Typography component="p" variant="body1" align="center">
						Temperature: {weather.main.temp}C
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<Typography component="p" variant="body1" align="center">
						Humidity: {weather.main.humidity}%
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<Typography component="p" variant="body1" align="center">
						Pressure: {weather.main.pressure}hPa
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default withStyles(styles)(InfoWindow);
