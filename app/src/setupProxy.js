const proxy = require("http-proxy-middleware");

module.exports = function(app) {
	app.use(proxy("/api", { target: "http://battuta.medunes.net" }));

	return app;
};
