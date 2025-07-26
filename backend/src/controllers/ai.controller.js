// ============ ai.controller.js ============
const MessageModel = require("../models/Message.model");
const ChatSessionModel = require("../models/ChatSession.model");
const { v4: uuidv4 } = require('uuid');

// Environment variables
const DEV_GENERATIVE_MODEL = process.env.DEV_GENERATIVE_MODEL;

// ============ Google Gemini ===================
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
// ==============================================

if (!GEMINI_API_KEY) {
  console.error('Gemini API key is missing in .env');
  process.exit(1);
}

const AIcontroller = async (req, res) => {
  try {
    const { prompt, chatSessionId } = req.body;
    const userId = req.user.id; // from auth middleware

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required"
      });
    }

    let chatSession;

    // If chatSessionId provided, find existing session
    if (chatSessionId) {
      chatSession = await ChatSessionModel.findOne({
        uuid: chatSessionId,
        user: userId
      });
      
      if (!chatSession) {
        return res.status(404).json({
          success: false,
          message: "Chat session not found"
        });
      }
    } else {
      // Create new chat session
      chatSession = new ChatSessionModel({
        uuid: uuidv4(),
        user: userId,
        title: prompt.substring(0, 50) + (prompt.length > 50 ? '...' : ''),
        latestMessage: prompt
      });
      await chatSession.save();
    }

    // Save user message
    const userMessage = new MessageModel({
      chatSession: chatSession._id,
      sender: "user",
      content: prompt
    });
    await userMessage.save();

    // Generate AI response using Gemini
    const model = genAI.getGenerativeModel({ model: DEV_GENERATIVE_MODEL });
    
    // Enhanced prompt for code generation
    const enhancedPrompt = `You are a helpful coding assistant. Generate clean, working code based on this request: "${prompt}". If it's a web component, provide HTML, CSS, and JavaScript. If it's a specific framework component, provide the appropriate code. Make sure the code is functional and well-commented.`;
    
    const result = await model.generateContent(enhancedPrompt);
    const aiResponse = result.response.text();

    // Extract code from AI response (assuming it's wrapped in code blocks)
    let extractedCode = '';
    const codeBlockRegex = /```(?:html|javascript|js|css|jsx|tsx|python|java|cpp|c\+\+)?\n?([\s\S]*?)```/gi;
    const codeMatches = aiResponse.match(codeBlockRegex);
    
    if (codeMatches) {
      extractedCode = codeMatches.map(match => 
        match.replace(/```(?:html|javascript|js|css|jsx|tsx|python|java|cpp|c\+\+)?\n?/gi, '').replace(/```/g, '')
      ).join('\n\n');
    }

    // Save AI message
    const aiMessage = new MessageModel({
      chatSession: chatSession._id,
      sender: "ai",
      content: aiResponse,
      code: extractedCode || null
    });
    await aiMessage.save();

    // Update chat session with latest message
    chatSession.latestMessage = aiResponse.substring(0, 100) + (aiResponse.length > 100 ? '...' : '');
    await chatSession.save();

    res.status(200).json({
      success: true,
      message: "AI response generated successfully",
      data: {
        chatSessionId: chatSession.uuid,
        response: aiResponse,
        code: extractedCode,
        messageId: aiMessage._id
      }
    });

  } catch (error) {
    console.error('AI Controller Error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
      error: error.message
    });
  }
}

module.exports = {
  AIcontroller
}