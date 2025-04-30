import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Authenticate user and set JWT token cookie
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Look for user with matching email
  const user = await User.findOne({ email });

  // Validate password and send user data if correct
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id); // Generate token and set cookie
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    // Respond with unauthorized error if credentials are invalid
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user and return token
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if a user already exists with the provided email
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create new user record
  const user = await User.create({
    name,
    email,
    password,
  });

  // Respond with token and user info if creation is successful
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user and clear token (placeholder)
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Logout User' }); // Placeholder logic
});

// @desc    Fetch logged-in user's profile (placeholder)
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'User Profile' }); // Placeholder logic
});

// @desc    Update user profile (placeholder)
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Update user profile' }); // Placeholder logic
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};