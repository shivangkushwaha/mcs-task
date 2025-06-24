const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    /** Find for user already exist */
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success : false ,message: 'User already exists', responseData : {} });
    }
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    let result = {
        name : user.name, 
        email : user.email, 
        token : token
    }
    return res.status(201).json({ success : true, message : 'User registered successfully', responseData : result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success : false ,message: 'Server error', responseData : {} });
  }
};

// Login user and return JWT
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ success : false ,message: 'You are not registered', responseData : {} });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ success : false ,message: 'Invalid credentials' ,responseData : {} });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    let result = {
        name : user.name, 
        email : user.email, 
        token : token
    }
    return res.status(200).json({ success : true, message : 'User registered successfully', responseData : result });
  } catch (error) {
    return res.status(500).json({ success : false ,message: 'Server error', responseData : {} });
  }
};
