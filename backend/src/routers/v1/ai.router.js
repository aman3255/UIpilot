const express = require('express');
const { AIcontroller } = require('../../controllers/ai.controller');
const { chatSessionController } = require('../../controllers/chatSession.controller');
const { codePreviewController } = require('../../controllers/codePreview.controller');
const { messageController }  = require('../../controllers/message.controller');
const { AuthMiddleware } = require('../../middlewares/auth.middleware');

// All routes require authentication
aiRouter.use(AuthMiddleware);

// ============ AI Routes ============
// Generate AI response
aiRouter.post('/generate', AIcontroller);

// ============ Chat Session Routes ============
// Create new chat session
aiRouter.post('/sessions', chatSessionController);

// Get all chat sessions for user
aiRouter.get('/sessions', chatSessionController);

// Get specific chat session with messages
aiRouter.get('/sessions/:sessionId', chatSessionController);

// Delete specific chat session
aiRouter.delete('/sessions/:sessionId', chatSessionController);

// ============ Message Routes ============
// Get messages for a specific session
aiRouter.get('/sessions/:sessionId/messages', messageController);

// Update a specific message (mainly for htmlPreview)
aiRouter.put('/messages/:messageId', messageController);

// Delete a specific message
aiRouter.delete('/messages/:messageId', messageController);

// ============ Code Preview Routes ============
// Get or update code preview for a message
aiRouter.get('/preview/:messageId', codePreviewController);
aiRouter.put('/preview/:messageId', codePreviewController);

module.exports = aiRouter;