import React, { Fragment } from "react";
import { Provider } from "react-redux";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue, pink } from "@material-ui/core/colors";

import store from "./store";
import RouterComp from "./router";

const theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: pink,
		background: blue
	},
	typography: {
		useNextVariants: true,
		align: "center"
	}
});

function App() {
	return (
		<Fragment>
			<Provider store={store}>
				<MuiThemeProvider theme={theme}>
					<RouterComp />
				</MuiThemeProvider>
			</Provider>
		</Fragment>
	);
}

export default App;
