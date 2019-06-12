import React from "react";
import ReactDOM from "react-dom";

import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

// setup promise for es6
import "es6-promise/auto";
// end setup

// env setup
const ENV = dotenv.config();
dotenvExpand(ENV);
// end env setup

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
