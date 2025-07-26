// ============ chatSession.controller.js ============
const ChatSessionModel = require("../models/ChatSession.model");
const MessageModel = require("../models/Message.model");
const { v4: uuidv4 } = require('uuid');

const chatSessionController = async (req, res) => {
  try {
    const { action } = req.query;
    const userId = req.user.id;

    switch (action) {
      case 'create':
        const { title } = req.body;
        const newSession = new ChatSessionModel({
          uuid: uuidv4(),
          title: title || "New Chat",
          user: userId
        });
        await newSession.save();
        
        res.status(201).json({
          success: true,
          message: "Chat session created successfully",
          data: newSession
        });
        break;

      case 'list':
        const sessions = await ChatSessionModel.find({ user: userId })
          .sort({ updatedAt: -1 })
          .select('uuid title latestMessage createdAt updatedAt');
        
        res.status(200).json({
          success: true,
          message: "Chat sessions retrieved successfully",
          data: sessions
        });
        break;

      case 'get':
        const { sessionId } = req.params;
        const session = await ChatSessionModel.findOne({
          uuid: sessionId,
          user: userId
        });
        
        if (!session) {
          return res.status(404).json({
            success: false,
            message: "Chat session not found"
          });
        }

        // Get messages for this session
        const messages = await MessageModel.find({ chatSession: session._id })
          .sort({ createdAt: 1 })
          .select('sender content code htmlPreview createdAt');

        res.status(200).json({
          success: true,
          message: "Chat session retrieved successfully",
          data: {
            session,
            messages
          }
        });
        break;

      case 'delete':
        const { sessionId: deleteSessionId } = req.params;
        const sessionToDelete = await ChatSessionModel.findOne({
          uuid: deleteSessionId,
          user: userId
        });
        
        if (!sessionToDelete) {
          return res.status(404).json({
            success: false,
            message: "Chat session not found"
          });
        }

        // Delete all messages in this session
        await MessageModel.deleteMany({ chatSession: sessionToDelete._id });
        
        // Delete the session
        await ChatSessionModel.findByIdAndDelete(sessionToDelete._id);

        res.status(200).json({
          success: true,
          message: "Chat session deleted successfully"
        });
        break;

      default:
        res.status(400).json({
          success: false,
          message: "Invalid action parameter"
        });
    }

  } catch (error) {
    console.error('Chat Session Controller Error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to handle chat session request",
      error: error.message
    });
  }
}

module.exports = {
  chatSessionController
}