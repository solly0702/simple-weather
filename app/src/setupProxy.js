const proxy = require("http-proxy-middleware");

module.exports = function(app) {
	const routes = ["/api/**"];

	const options = {
		target: process.env.REACT_APP_LOCATION_PROXY
		// changeOrigin: true,
		// logLevel: "debug",
		// secure: false
	};

	// app.use(proxy(routes, options));
	app.use(proxy("/api", { target: "http://battuta.medunes.net" }));

	return app;
};
