import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token and sets it as an HTTP-only cookie in the response.
 *
 * @param {Object} res     - Express response object
 * @param {string} userId  - ID of the authenticated user
 */
const generateToken = (res, userId) => {
  // Sign the JWT with the user's ID and set it to expire in 30 days
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Set the token in a cookie with security best practices
  res.cookie('jwt', token, {
    httpOnly: true,                        // Prevents access from client-side JS (mitigates XSS)
    secure: process.env.NODE_ENV !== 'development', // Use HTTPS only in production
    sameSite: 'strict',                    // Prevents CSRF by allowing same-site requests only
    maxAge: 30 * 24 * 60 * 60 * 1000,      // Cookie expires in 30 days (in milliseconds)
  });
};

export default generateToken;