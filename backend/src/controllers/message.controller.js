// ============ message.controller.js ============
const MessageModel = require("../models/Message.model");
const ChatSessionModel = require("../models/ChatSession.model");

const messageController = async (req, res) => {
  try {
    const { action } = req.query;
    const userId = req.user.id;

    switch (action) {
      case 'get':
        const { sessionId } = req.params;
        
        // Find the chat session
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
          message: "Messages retrieved successfully",
          data: messages
        });
        break;

      case 'update':
        const { messageId } = req.params;
        const { htmlPreview } = req.body;
        
        const message = await MessageModel.findById(messageId);
        if (!message) {
          return res.status(404).json({
            success: false,
            message: "Message not found"
          });
        }

        // Verify the message belongs to user's session
        const messageSession = await ChatSessionModel.findOne({
          _id: message.chatSession,
          user: userId
        });

        if (!messageSession) {
          return res.status(403).json({
            success: false,
            message: "Unauthorized to update this message"
          });
        }

        message.htmlPreview = htmlPreview;
        await message.save();

        res.status(200).json({
          success: true,
          message: "Message updated successfully",
          data: message
        });
        break;

      case 'delete':
        const { messageId: deleteMessageId } = req.params;
        
        const messageToDelete = await MessageModel.findById(deleteMessageId);
        if (!messageToDelete) {
          return res.status(404).json({
            success: false,
            message: "Message not found"
          });
        }

        // Verify the message belongs to user's session
        const deleteMessageSession = await ChatSessionModel.findOne({
          _id: messageToDelete.chatSession,
          user: userId
        });

        if (!deleteMessageSession) {
          return res.status(403).json({
            success: false,
            message: "Unauthorized to delete this message"
          });
        }

        await MessageModel.findByIdAndDelete(deleteMessageId);

        res.status(200).json({
          success: true,
          message: "Message deleted successfully"
        });
        break;

      default:
        res.status(400).json({
          success: false,
          message: "Invalid action parameter"
        });
    }

  } catch (error) {
    console.error('Message Controller Error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to handle message request",
      error: error.message
    });
  }
}

module.exports = {
  messageController
}