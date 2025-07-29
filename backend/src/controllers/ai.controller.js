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

        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ success: false, message: "User not authenticated" });

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

        // Enhanced prompt for React component generation
        const enhancedPrompt = `You are a helpful React coding assistant. Generate clean, working React components based on this request: "${prompt}". 

        CRITICAL REQUIREMENTS:
        1. Use ONLY inline styles with style={{}} syntax - NO styled-components, NO CSS libraries
        2. Generate complete, working React functional components
        3. Use TypeScript for type safety
        4. Include proper imports (React, useState, useEffect, etc.)
        5. Make components simple and self-contained
        6. Include proper TypeScript interfaces for props
        7. Add helpful comments explaining the code
        8. Ensure the component is fully functional and ready to use immediately
        
        FORBIDDEN:
        - Do NOT use styled-components
        - Do NOT use external CSS libraries
        - Do NOT use CSS-in-JS libraries
        - Do NOT use complex styling frameworks
        
        REQUIRED STYLING APPROACH:
        - Use ONLY inline styles: style={{ backgroundColor: 'blue', color: 'white' }}
        - Use simple CSS properties: backgroundColor, color, padding, margin, borderRadius, fontSize, etc.
        - Make components completely self-contained
        
        Example of CORRECT format:
        \`\`\`tsx
        import React, { useState } from 'react';

        interface ButtonProps {
          children: React.ReactNode;
          onClick?: () => void;
        }

        const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
          const [isHovered, setIsHovered] = useState(false);

          return (
            <button
              onClick={onClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                backgroundColor: isHovered ? '#0056b3' : '#007bff',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.3s ease'
              }}
            >
              {children}
            </button>
          );
        };

        export default Button;
        \`\`\`
        
        Generate a complete, simple React component using ONLY inline styles based on: "${prompt}"`;

        const result = await model.generateContent(enhancedPrompt);
        const aiResponse = result.response.text();
        
        console.log('AI Response:', aiResponse);
        console.log('AI Response Length:', aiResponse.length);

        // Extract code from AI response (assuming it's wrapped in code blocks)
        let extractedCode = '';
        const codeBlockRegex = /```(?:html|javascript|js|css|jsx|tsx|python|java|cpp|c\+\+)?\n?([\s\S]*?)```/gi;
        const codeMatches = aiResponse.match(codeBlockRegex);

        if (codeMatches) {
            extractedCode = codeMatches.map(match =>
                match.replace(/```(?:html|javascript|js|css|jsx|tsx|python|java|cpp|c\+\+)?\n?/gi, '').replace(/```/g, '')
            ).join('\n\n');
        } else {
            // If no code blocks found, try to extract React component code from the response
            // Look for patterns that indicate React/TypeScript code
            const reactPatterns = [
                /import React[^;]*;/gi,
                /const\s+\w+\s*:\s*React\.FC/gi,
                /function\s+\w+\s*\(/gi,
                /return\s*\(/gi,
                /export\s+default/gi
            ];
            
            const hasReactCode = reactPatterns.some(pattern => pattern.test(aiResponse));
            
            if (hasReactCode) {
                // Extract the entire response as code if it contains React patterns
                extractedCode = aiResponse;
            }
        }
        
        // Clean up the extracted code
        if (extractedCode) {
            // Remove any markdown formatting that might have been included
            extractedCode = extractedCode.replace(/^\s*```\w*\s*\n?/gm, '').replace(/\n?\s*```\s*$/gm, '');
            
            // Remove any extra asterisks or formatting characters
            extractedCode = extractedCode.replace(/^\s*\*\s*/gm, '').replace(/\s*\*\s*$/gm, '');
            
            // Clean up any malformed template literals or syntax
            extractedCode = extractedCode.replace(/`\s*;\s*`/g, '`');
            extractedCode = extractedCode.replace(/\*\s*;/g, '');
            
            // Fix common syntax issues
            extractedCode = extractedCode.replace(/\|\s*;/g, ';');
            extractedCode = extractedCode.replace(/\|\s*}/g, '}');
            extractedCode = extractedCode.replace(/\|\s*\)/g, ')');
            
            // Remove styled-components imports and usage
            extractedCode = extractedCode.replace(/import\s+styled\s+from\s+['"]styled-components['"];?\s*/g, '');
            extractedCode = extractedCode.replace(/const\s+\w+\s*=\s*styled\.\w+[^;]*;?\s*/g, '');
            
            // Fix any incomplete code blocks
            extractedCode = extractedCode.replace(/‹\s*/g, '<');
            extractedCode = extractedCode.replace(/\s*›/g, '>');
            
            // Ensure the code ends properly
            if (!extractedCode.includes('export default')) {
                // Try to find the component name and add export
                const componentMatch = extractedCode.match(/const\s+(\w+):\s*React\.FC/);
                if (componentMatch) {
                    extractedCode += `\n\nexport default ${componentMatch[1]};`;
                }
            }
        }
        
        // If still no code extracted or code is malformed, provide a fallback
        if (!extractedCode || extractedCode.trim().length === 0 || extractedCode.includes('styled-components')) {
            // Generate a simple fallback component based on the prompt
            let fallbackComponent = '';
            
            if (prompt.toLowerCase().includes('button')) {
                fallbackComponent = `import React, { useState } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  const [backgroundColor, setBackgroundColor] = useState('#007bff');

  const handleClick = () => {
    // Generate a random color
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    setBackgroundColor(randomColor);
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: backgroundColor,
        color: 'white',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'background-color 0.3s ease'
      }}
    >
      {children}
    </button>
  );
};

export default Button;`;
            } else {
                fallbackComponent = `import React from 'react';

const GeneratedComponent: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #dee2e6'
    }}>
      <h1 style={{ color: '#495057', marginBottom: '16px' }}>Generated Component</h1>
      <p style={{ color: '#6c757d', marginBottom: '8px' }}>Based on your request: "${prompt}"</p>
      <p style={{ color: '#6c757d', fontSize: '14px' }}>A simple React component has been generated for you.</p>
    </div>
  );
};

export default GeneratedComponent;`;
            }
            
            extractedCode = fallbackComponent;
        }

        // Save AI message
        const aiMessage = new MessageModel({
            chatSession: chatSession._id,
            sender: "ai",
            content: aiResponse,
            code: extractedCode || null
        });
        await aiMessage.save();
        
        console.log('Extracted Code:', extractedCode);
        console.log('Extracted Code Length:', extractedCode.length);

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