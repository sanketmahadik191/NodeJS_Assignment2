const bcrypt = require('bcrypt');
const users = require('../model/authModel');

// Register User
const register = async (req, res) => {
    console.log("re");
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await users.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
     console.log(hashedPassword)
    // Save user
    const newUser = new users({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
};

// Login User
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
    // Find user
    const user = await users.findOne({username});
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.password) {
        return res.status(500).json({ message: 'User password is missing from the database' });
    }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    res.json({ message: 'Login successful' });
};

const authControllers = {
    login ,register
}

module.exports = authControllers;
