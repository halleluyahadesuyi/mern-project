import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the schema structure for the User model
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,     // User must provide a name
    },
    email: {
      type: String,
      required: true,     // User must provide an email
      unique: true,       // Email must be unique across users
    },
    password: {
      type: String,
      required: true,     // User must provide a password
    },
  },
  {
    timestamps: true,      // Automatically adds createdAt and updatedAt fields
  }
);

// Middleware that runs before saving a user to the database
userSchema.pre('save', async function (next) {
  // Only hash the password if it's been modified (or on new user)
  if (!this.isModified('password')) {
    next();
  }

  // Generate a salt and hash the password with it
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method to compare an entered password with the hashed one
userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model using the defined schema
const User = mongoose.model('User', userSchema);
export default User;