import express from 'express'; import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const server = {
	app: express(),
}
const app = server.app;
app.use(express.json());

// Connect to mongodb database
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
];

// Get post
app.get('/post', authenticationToken, (req, res) => {
	const { id, username } = req.user;
	res.json(posts.filter(post => post.username === username));
});

// Add post
app.get('/add_post', authenticationToken, (req, res) => {
	try {
		const { id, username } = req.user;
		const { post } = req.body;
		let userIndex = -1;

		for (let i = 0; i < posts.length; i++)
			if (posts[i].username == username) userIndex = i;
		
		if (userIndex == -1) 
			return res.status(400).json({ message: "User doesn't seem to exist" });

		if (!post) 
			return res.status(400).json({ message: "No post dud" });

		posts[userIndex].post.push(post);
		return res.status(200).json({ message: `Post has been added to ${username}.` });
	} catch (err) {
		return res.status(500).json({ message: "There was an error in the server." });
	}
});

// Login route
app.post('/login', async (req, res) => {
	try {
		const { username, password  } = req.body;
		
		const user = posts.find(post => post.username == username);
		if (!user) 
			return res.status(400).json({ message: "The user does not seem to exist." });

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect)
			return res.status(400).json({ message: "Invalid credentials dud." });
		

		const accessToken = jwt.sign(
			{ id: user.id, username: user.username }, 
			process.env.ACCESS_TOKEN_SECRET, 
			{expiresIn: '5m'}
		);

		res.status(200).json({ message: "Login successful.", accessToken });
	}
	catch (err) {
		return res.status(500).json({ message: "An error happened in the server." })
	}
})

// Register route
app.post('/register', async (req, res) => {
	try {
		const { username, password, post } = req.body;

		if (!username || !password) 
			return res.status(400).json({ message: "Email and password required." });

		const usernameDoesExist = posts.find(post => post.username == username);
		if (usernameDoesExist) 
			return res.status(400).json({ message: "The user already exists." });

		// Hash password and append user to posts
		const hashed_password = await bcrypt.hash(password, 10);
		const newUser = { 
			id: Date.now().toString(), 
			username, 
			password: hashed_password, 
			post: []
		};

		newUser.post.push(post || "N/A");

		posts.push(newUser);
		res.status(201).json({ messsage: "User has been registered" });
	}
	catch (err) {
		res.status(500).json({ message: "An error happened in the server." });
		//console.log(err);
	}
})


// Middleware
function authenticationToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) return res.status(401).json({ message: "No access token found." });

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ message: "Invalid or expired token fam." });
		}

		req.user = user;
		next();
	})
}

