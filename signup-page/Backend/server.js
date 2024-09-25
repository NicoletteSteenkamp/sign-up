import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "",
  database: 'signup'
});

db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err);
      return;
    }
    console.log('Connected to the database');
  });
  
  // Registration Route
  app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).send('All fields are required');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = { name, email, password: hashedPassword };
  
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err, result) => {
      if (err) {
        return res.status(500).send('Server error');
      }
      
      const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ message: 'User registered', token });
    });
  });
  
app.listen(8081, () => console.log('Server running'));
