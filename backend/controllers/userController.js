import User from '../models/user.js';
import bcrypt from 'bcryptjs'; // For password comparison
import jwt from 'jsonwebtoken'; // For generating the token

export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone_number } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ name, email, password: hashedPassword, phone_number });

    // Respond with the created user (excluding password)
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
    });

  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeValidationError') {
      const errorMessages = [];

      const passwordError = error.errors.find(err => err.path === 'password');
      if (passwordError) {
        errorMessages.push('Password must be between 8 and 64 characters long');
        return res.status(400).json({
          message: 'Password must be between 8 and 64 characters long',
          errors: errorMessages,
        });
      }

      return res.status(400).json({
        message: error.errors[0].message,
        errors: [error.errors[0].message],
      });
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      const uniqueErrors = error.errors.map(err => err.path);
      const errorMessage = uniqueErrors.includes('email') ? 'This email is already taken' :
                           uniqueErrors.includes('phone_number') ? 'This phone number is already taken' :
                           'This field is already taken';
      return res.status(400).json({
        message: errorMessage,
        errors: uniqueErrors,
      });
    }

    res.status(500).json({
      message: 'Server error, please try again later',
      error: error.message || error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials',
        errors: ['User not found'],
      });
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials',
        errors: ['Incorrect password'],
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return the token and user info (excluding password)
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error, please try again later',
      error: error.message || error,
    });
  }
};

export const getProfile = async (req, res) => {
    try {
      // Use req.user from the authentication middleware (JWT decoded user)
      const userId = req.user.id;
  
      const user = await User.findOne({
        where: { id: userId },
        attributes: ['id', 'name', 'email', 'phone_number', 'role', 'profile_picture', 'status']
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
        profile_picture: user.profile_picture,
        status: user.status
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };