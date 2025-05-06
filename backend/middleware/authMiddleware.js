import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// Middleware to protect private routes by verifying JWT token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Retrieve the token from the request's cookies
  token = req.cookies.jwt;

  // If token exists, verify it
  if (token) {
    try {
      // Decode token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID in the token payload, exclude password from result
      req.user = await User.findById(decoded.userId).select('-password');

      // Call next middleware or route handler
      next();
    } catch (error) {
      // Token verification failed
      res.status(401);
      throw new Error('Not authorized, invalid token');
    }
  } else {
    // No token provided
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };