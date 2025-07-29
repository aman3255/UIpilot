// ============ auth.middleware.js ============
const jwt = require('jsonwebtoken');
const UserModel = require('../models/users.model'); // Make sure this path is correct

const AuthMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided or invalid format."
      });
    }

    // Extract token (remove 'Bearer ' prefix)
    const token = authHeader.substring(7);
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided."
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Find user by ID from token
    const user = await UserModel.findById(decoded.userId || decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. User not found."
      });
    }

    // Attach user to request object
    req.user = {
      id: user._id.toString(),
      username: user.username,
      email: user.email
    };

    next();
    
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: "Invalid token."
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired."
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
      error: error.message
    });
  }
};

module.exports = {
  AuthMiddleware
};