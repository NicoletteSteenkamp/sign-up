app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).send('All fields are required');
    }
  
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
      if (err) {
        return res.status(500).send('Server error');
      }
  
      if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
        return res.status(400).send('Invalid email or password');
      }
  
      const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    });
  });
  