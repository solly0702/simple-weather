import React from "react";
import { connect } from "react-redux";
import { Paper, Grid, FormControl, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";

import { deleteFav } from "../actions/location";
import Dropdown from "./dropdown/Dropdown";

const styles = theme => ({
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
			3
		)}px`,
		backgroundImage:
			"linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))"
	}
});

class Favorite extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			favorite: ""
		};
	}

	onChangeDropdown = (v, e) => {
		this.props.selectedCity(v.value);
		return this.setState({ [e.name]: v });
	};

	onClickDelete = () => {
		this.props.deleteFav(this.state.favorite.value);
		this.setState({ favorite: "" });
	};

	render() {
		const { classes, favorites } = this.props;
		const { favorite } = this.state;

		const conSize = _.isEmpty(favorite) ? 12 : 8;

		return (
			<Paper className={classes.paper}>
				<Grid container alignItems="center">
					<Grid item xs={conSize}>
						<FormControl margin="normal" fullWidth>
							<Dropdown
								isMulti={false}
								label={"Favorite Cities"}
								name="favorite"
								onChange={this.onChangeDropdown}
								options={favorites}
								value={favorite}
								// error={errors.flavor}
								required
							/>
						</FormControl>
					</Grid>

					{!_.isEmpty(favorite) && (
						<Grid item xs={4} align="center">
							<Button
								variant="contained"
								style={{
									backgroundColor: "red",
									color: "white"
								}}
								className={classes.button}
								onClick={this.onClickDelete}
							>
								Delete Favorite
							</Button>
						</Grid>
					)}
				</Grid>
			</Paper>
		);
	}
}

export default withStyles(styles)(
	connect(
		null,
		{
			deleteFav
		}
	)(Favorite)
);
