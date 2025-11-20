const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  console.log('📝 Backend: Register request received');
  console.log('📧 Email:', req.body.email);
  console.log('👤 Name:', req.body.name);
  console.log('🔑 Password provided:', !!req.body.password);
  console.log('📨 Request headers:', req.headers);
  console.log('📨 Request method:', req.method);
  console.log('� Request URL:', req.url);
  console.log('📨 Full request body:', req.body);

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log('❌ Missing fields - name:', !!name, 'email:', !!email, 'password:', !!password);
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    console.log('🔍 Checking if user exists...');
    const userExists = await User.findOne({ email });
    console.log('🔍 User exists result:', !!userExists);

    if (userExists) {
      console.log('❌ User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log('👤 Creating user...');
    const user = await User.create({ name, email, password });
    console.log('✅ User created successfully with ID:', user._id);
    console.log('✅ User data:', { name: user.name, email: user.email, role: user.role });

    console.log('🔐 Generating JWT token...');
    const token = generateToken(user._id);
    console.log('🔐 Token generated successfully');

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (error) {
    console.error('❌ Register error:', error);
    console.error('❌ Error name:', error.name);
    console.error('❌ Error message:', error.message);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({ message: error.message, error: error.name });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  console.log('Backend: Login request received for email:', req.body.email);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
