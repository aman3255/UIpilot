// ============ codePreview.controller.js ============
const MessageModel = require("../models/Message.model");
const ChatSessionModel = require("../models/ChatSession.model");

const codePreviewController = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { htmlPreview } = req.body;
        const userId = req.user.id;

        if (!messageId) {
            return res.status(400).json({
                success: false,
                message: "Message ID is required"
            });
        }

        // Find the message
        const message = await MessageModel.findById(messageId);
        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        // Verify the message belongs to user's session
        const session = await ChatSessionModel.findOne({
            _id: message.chatSession,
            user: userId
        });

        if (!session) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to access this message"
            });
        }

        // If htmlPreview is provided, update it
        if (htmlPreview !== undefined) {
            message.htmlPreview = htmlPreview;
            await message.save();
        }

        // Generate HTML preview if code exists and no htmlPreview is stored
        let preview = message.htmlPreview;

        if (!preview && message.code) {
            // Simple HTML wrapper for code preview
            preview = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Preview</title>
    <style>
        body { 
            margin: 0; 
            padding: 20px; 
            font-family: Arial, sans-serif; 
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
        }
    </style>
</head>
<body>
    <div class="container">
        ${message.code}
    </div>
</body>
</html>`;

            // Save the generated preview
            message.htmlPreview = preview;
            await message.save();
        }

        res.status(200).json({
            success: true,
            message: "Code preview retrieved successfully",
            data: {
                messageId: message._id,
                code: message.code,
                htmlPreview: preview,
                hasCode: !!message.code
            }
        });

    } catch (error) {
        console.error('Code Preview Controller Error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to handle code preview request",
            error: error.message
        });
    }
}

module.exports = {
    codePreviewController
}