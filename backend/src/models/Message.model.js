const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  chatSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatSession",
    required: true
  },
  sender: {
    type: String,
    enum: ["user", "ai"],
    required: true
  },
  content: { // THE PROMPT (e.g. "Build a React button")
    type: String,
    required: true
  },
  code: {
    type: String // AI-generated code
  },
  htmlPreview: {
    type: String // (optional) HTML-rendered preview (useful for caching client preview)
  }
}, {
  timestamps: true
});

const MessageModel = mongoose.model("Message", MessageSchema);
module.exports = MessageModel;
