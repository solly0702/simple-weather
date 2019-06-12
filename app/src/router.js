import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import history from "./history";

import Main from "./components/Main";

const router = () => {
	const { location } = history;

	return (
		<Router history={history}>
			<Switch>
				<Route location={location} path="/" component={Main} />
			</Switch>
		</Router>
	);
};

export default router;
