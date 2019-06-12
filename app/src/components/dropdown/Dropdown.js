import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Select from "react-select";
import {
	Typography,
	TextField,
	Paper,
	Chip,
	MenuItem,
	FormControl,
	FormHelperText
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { withStyles } from "@material-ui/core/styles";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import _ from "lodash";

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: 250
	},
	input: {
		display: "flex",
		padding: 0
	},
	valueContainer: {
		display: "flex",
		flexWrap: "wrap",
		flex: 1,
		alignItems: "center",
		overflow: "hidden"
	},
	chip: {
		margin: `${theme.spacing(5)}px ${theme.spacing(0.25)}px`
	},
	chipFocused: {
		backgroundColor: emphasize(
			theme.palette.type === "light"
				? theme.palette.grey[300]
				: theme.palette.grey[700],
			0.08
		)
	},
	noOptionsMessage: {
		padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
	},
	singleValue: {
		fontSize: 13
	},
	placeholder: {
		position: "absolute",
		left: 2,
		fontSize: 13
	},
	paper: {
		position: "absolute",
		zIndex: 1,
		marginTop: theme.spacing(1),
		left: 0,
		right: 0
	},
	divider: {
		height: theme.spacing(2)
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: "90%"
	}
});

function NoOptionsMessage(props) {
	return (
		<Typography
			color="textSecondary"
			className={props.selectProps.classes.noOptionsMessage}
			nowrap="true"
			{...props.innerProps}
		>
			{props.children}
		</Typography>
	);
}

function inputComponent({ inputRef, ...props }) {
	return <div ref={inputRef} {...props} />;
}

function Control(props) {
	return (
		<TextField
			fullWidth
			InputProps={{
				inputComponent,
				inputProps: {
					className: props.selectProps.classes.input,
					inputRef: props.innerRef,
					children: props.children,
					...props.innerProps
				}
			}}
			{...props.selectProps.textFieldProps}
		/>
	);
}

function Option(props) {
	return (
		<MenuItem
			buttonRef={props.innerRef}
			selected={props.isFocused}
			component="div"
			style={{
				fontWeight: props.isSelected ? 500 : 400,
				fontSize: "0.8rem"
			}}
			{...props.innerProps}
		>
			{props.children}
		</MenuItem>
	);
}

function Placeholder(props) {
	return (
		<Typography
			color="textSecondary"
			className={props.selectProps.classes.placeholder}
			nowrap="true"
			{...props.innerProps}
		>
			{props.children}
		</Typography>
	);
}

function SingleValue(props) {
	return (
		<Typography
			className={props.selectProps.classes.singleValue}
			nowrap="true"
			{...props.innerProps}
		>
			{props.children}
		</Typography>
	);
}

function ValueContainer(props) {
	return (
		<div className={props.selectProps.classes.valueContainer}>
			{props.children}
		</div>
	);
}

function MultiValue(props) {
	return (
		<Chip
			tabIndex={-1}
			label={props.children}
			className={classNames(props.selectProps.classes.chip, {
				[props.selectProps.classes.chipFocused]: props.isFocused
			})}
			onDelete={props.removeProps.onClick}
			deleteIcon={<CancelIcon {...props.removeProps} />}
		/>
	);
}

function Menu(props) {
	return (
		<Paper
			square
			className={props.selectProps.classes.paper}
			{...props.innerProps}
		>
			{props.children}
		</Paper>
	);
}

const components = {
	Control,
	Menu,
	MultiValue,
	NoOptionsMessage,
	Option,
	Placeholder,
	SingleValue,
	ValueContainer
};

class Dropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			options: []
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const options = [];
		const { label } = nextProps;

		_.forEach(nextProps.options, o => {
			options.push({
				label: _.includes(label.toLowerCase().trim(), "cit")
					? o.city
					: o.name || o.region,
				value: o
			});
		});

		if (_.isEqual(prevState.options.sort(), options.sort())) {
			return null;
		}
		return { ...prevState, options };
	}

	render() {
		const { options } = this.state;
		const {
			classes,
			theme,
			isMulti,
			label,
			onMenuOpen,
			onChange,
			onMenuClose,
			isLoading,
			isDisabled,
			error,
			required,
			placeholder,
			manuIsOpen,
			name,
			value
		} = this.props;

		const selectStyles = {
			input: base => ({
				...base,
				color: theme.palette.text.primary,
				"& input": {
					font: "inherit"
				}
			})
		};

		const newPlaceHolder = placeholder || `Select ${label}`;

		// modifying dropdown by showing options
		let dropdownIndicator = null;
		if (typeof manuIsOpen === "boolean" && manuIsOpen === false) {
			dropdownIndicator = {
				DropdownIndicator: () => null
			};
		}

		return (
			<FormControl className={classes.formControl}>
				<Select
					classes={classes}
					styles={selectStyles}
					textFieldProps={{
						error: !!error,
						required: !!required,
						label,
						InputLabelProps: {
							shrink: true
						}
					}}
					options={options}
					components={
						!dropdownIndicator ? components : (components, dropdownIndicator)
					}
					value={value}
					onChange={onChange}
					placeholder={newPlaceHolder}
					isMulti={isMulti}
					isDisabled={isLoading || isDisabled}
					isClearable
					onMenuOpen={onMenuOpen}
					onMenuClose={onMenuClose}
					menuIsOpen={_.isEmpty(error) ? manuIsOpen : false}
					closeMenuOnSelect={!isMulti}
					name={name || ""}
					isLoading={isLoading}
				/>
				{!!error && (
					<FormHelperText style={{ color: "red" }}>{error}</FormHelperText>
				)}
			</FormControl>
		);
	}
}

function mapStateToProps(state) {
	return {
		loading: state.loading
	};
}

export default withStyles(styles, { withTheme: true })(
	connect(
		mapStateToProps,
		{}
	)(Dropdown)
);
