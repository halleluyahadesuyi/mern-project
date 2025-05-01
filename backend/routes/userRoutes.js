import express from 'express';
const router = express.Router();

// Import user-related controller functions
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';

// Route to register a new user
// POST /api/users/
router.post('/', registerUser);

// Route to authenticate user and set JWT cookie
// POST /api/users/auth
router.post('/auth', authUser);

// Route to log out the user
// POST /api/users/logout
router.post('/logout', logoutUser);

// Routes to get and update user profile
// GET /api/users/profile
// PUT /api/users/profile
router.route('/profile').get(getUserProfile).put(updateUserProfile);

export default router;