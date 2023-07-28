const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authRegister = async ({ username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const response = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    return {
      username,
      email,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
const authLogin = async ({ email, password }) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }

    // GENERATE TOKEN
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h', // Token expires in 1 hour
      }
    );
    return {
      token,
      expiresIn: '1h',
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  authRegister,
  authLogin,
};
