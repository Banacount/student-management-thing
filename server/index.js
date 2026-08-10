import express from 'express';
import mongoose, { mongo } from 'mongoose';

const server = {
	app: express(),
}
const app = server.app;


mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to the fukin database!");
		app.listen(process.env.PORT || 5000);
	})
	.catch((error) => {
		console.error("Error: ", error.message);
		process.exit(1);
	}
)

app.get('/', async (req, res) => { 
	try {
		const db = mongoose.connection.db;
		const data = await db.collection('items').find({}).toArray();

		res.json(data);
	} catch (err) {
		res.status(500).json({ fukin_error: err.message });
	}
});
