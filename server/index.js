import express from 'express'; import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Models
import { Teacher } from './TeacherModel/model.js';
import { Student } from './StudentModel/model.js';

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

const teachers = [
];


// Get student
app.get('/get_teacher', authenticationToken, (req, res) => {
	const { id, username } = req.user;
	res.json(teachers.filter(teacher => teacher.username === username));
});

// Add student
app.get('/add_student', authenticationToken, (req, res) => {
	try {
		const { id, username } = req.user;
		const { student_name } = req.body;
		let userIndex = -1;

		for (let i = 0; i < teachers.length; i++)
			if (teachers[i].username == username) userIndex = i;

		if (userIndex == -1) 
			return res.status(400).json({ message: "User doesn't seem to exist." });

		// Check if the student is already there
		const isStudent = teachers[userIndex].students.find(student => student.fullname === student_name);
		if (isStudent)
			return res.status(400).json({ message: "Student already exists." })

		if (!student_name) 
			return res.status(400).json({ message: "Student name is required." });

		const student = new Student(student_name);
		teachers[userIndex].students.push(student);
		return res.status(200).json({ message: `Student has been added.` });
	} catch (err) {
		return res.status(500).json({ message: "There was an error in the server." });
	}
});

// Login route
app.post('/login', async (req, res) => {
	try { const { username, password  } = req.body;
		
		const user = teachers.find(teacher => teacher.username == username);
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
		const { username, password, fullname } = req.body;

		if (!username || !password || !fullname) 
			return res.status(400).json({ message: "Email, Full name, password required." });

		const usernameDoesExist = teachers.find(teacher => teacher.username == username);
		if (usernameDoesExist) 
			return res.status(400).json({ message: "The user already exists." });

		// Hash password and append user to posts
		const hashed_password = await bcrypt.hash(password, 10);
		
		const teacher = new Teacher(fullname, username, hashed_password);
		teachers.push(teacher);
		res.status(201).json({ messsage: "Teacher has been registered" });
	}
	catch (err) {
		res.status(500).json({ message: "An error happened in the server." });
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

