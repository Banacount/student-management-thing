import express from 'express';

const server = {
	app: express(),

	config: {
		port: 5959
	}
}
const app = server.app;

app.listen(server.config.port);

app.get('/', (req, res) => {
	res.send("Everybody starts somewhere, right?!");
	console.log("Somebody visited, and we do start somewhere fasho!");
});
