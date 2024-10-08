import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://sign-up-frontend.onrender.com',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(cookieParser());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 26528, 
    ssl: {
        rejectUnauthorized: false
    }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).send('A token is required for authentication');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid Token');
        req.user = decoded;
        next();
    });
};

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to Aiven MySQL database');
});

// Function to generate and set JWT cookie
const generateToken = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
};

// Registration Route
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        // Check if the email already exists
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).send('Server error');
            }

            if (results.length > 0) {
                return res.status(409).send('Email already exists');
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = { name, email, password: hashedPassword };

            // Insert the user into the database
            const sql = 'INSERT INTO users SET ?';
            db.query(sql, user, (err, result) => {
                if (err) {
                    console.error('Database insertion error:', err);
                    return res.status(500).send('Server error');
                }

                // Generate and set JWT token in cookie
                generateToken(result.insertId, res);
                res.status(201).json({ message: 'User registered' });
            });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('All fields are required');
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Login error:', err);
            return res.status(500).send('Server error');
        }
        if (results.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send('Invalid email or password');
        }

        // Generate and set JWT token in cookie
        generateToken(user.id, res);
        res.json({ message: 'Login successful' });
    });
});

// Protected Route
app.get('/api/protected', verifyToken, (req, res) => {
    res.send('This is a protected route. Welcome, user ID: ' + req.user.id);
});

// Start server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
