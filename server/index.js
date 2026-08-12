import express from 'express';
import mongoose, { mongo } from 'mongoose';
import jwt from 'jsonwebtoken';

const server = {
	app: express(),
}
const app = server.app;
app.use(express.json());

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

/*
app.get('/', async (req, res) => { 
	try {
		const db = mongoose.connection.db;
		const data = await db.collection('items').find({}).toArray();

		res.json(data);
	} catch (err) {
		res.status(500).json({ fukin_error: err.message });
	}
});
*/

const posts = [
	{
		name: "JohnRushell",
		post: "This my post bih"
	},
	{
		name: "Ngga",
		post: "Post 2"
	},
	{
		name: "Bruh",
		post: "Post 3"
	},
	{
		name: "Illdiebitch",
		post: "Post 3"
	},
	{
		name: "fkthislife",
		post: "Post 3"
	},
	{
		name: "iluvtslife",
		post: "Post 3"
	},
]

app.get('/posts', authenticationToken, (req, res) => {
	const get_user = req.user.name
	res.json(posts.filter(post => post.name === get_user));
});

app.post('/login', async (req, res) => {
	const username = req.body.username;
	const user = { name: username };

	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
	res.json({ accessToken: accessToken });
})


// Middlewares
function authenticationToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) res.sendStatus(401);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);

		req.user = user;
		console.log(user);
		next();
	})
}

// Yo finish the video dud: 
// JWT Authentication Tutorial - Node.js [18:54]
