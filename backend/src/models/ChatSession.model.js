const mongoose = require("mongoose");

const ChatSessionSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    default: "New Chat"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  latestMessage: {
    type: String, // can auto-update with last user prompt or AI response
  }
}, {
  timestamps: true
});

const ChatSessionModel = mongoose.model("ChatSession", ChatSessionSchema);

module.exports = ChatSessionModel;
