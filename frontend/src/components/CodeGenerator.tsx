import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAI } from '../hooks/useAI';
import { useAuth } from '../hooks/useAuth';
import { ChatSession, Message, GenerateRequest } from '../types/ai';
import { ChatSessions } from './ChatSessions';
import { ReactCodeEditor } from './ReactCodeEditor';

interface CodeGeneratorProps {
  isAuthenticated: boolean;
  onAuthRequired: () => void;
}

export const CodeGenerator: React.FC<CodeGeneratorProps> = ({ 
  isAuthenticated, 
  onAuthRequired
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    generateCode, 
    chatSessionOperation, 
    messageOperation, 
    codePreviewOperation,
    isLoading, 
    error, 
    clearError 
  } = useAI();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // State management
  const [prompt, setPrompt] = useState('');
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [editedCode, setEditedCode] = useState('');



  // Load messages for a session
  const loadMessages = async (sessionId: string) => {
    try {
      const response = await messageOperation('get', sessionId);
      if (response.success && Array.isArray(response.data)) {
        setMessages(response.data as Message[]);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  // Generate code using AI
  const handleGenerateCode = async () => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }

    if (!prompt.trim()) {
      return;
    }

    clearError();

    try {
      const request: GenerateRequest = {
        prompt: prompt.trim(),
        chatSessionId: currentSession?.uuid
      };

      const response = await generateCode(request);
      
      if (response.success) {
        // Load updated messages
        if (response.data.chatSessionId) {
          await loadMessages(response.data.chatSessionId);
        }

        // Set the generated code for editing
        console.log('Generated code:', response.data.code);
        console.log('Generated code length:', response.data.code?.length);
        setEditedCode(response.data.code || '');
        
        // Clear the prompt
        setPrompt('');
        
        // Clear any previous errors
        clearError();
      }
    } catch (error) {
      console.error('Generation error:', error);
    }
  };

  // Create new chat session
  const createNewSession = async () => {
    try {
      const response = await chatSessionOperation('create', undefined, {
        title: 'New Chat Session'
      });
      
      if (response.success) {
        const newSession = response.data as ChatSession;
        setCurrentSession(newSession);
        setMessages([]);
        setEditedCode('');
      }
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  // Select a chat session
  const selectSession = async (session: ChatSession) => {
    setCurrentSession(session);
    await loadMessages(session.uuid);
  };

  // Delete a chat session
  const deleteSession = async (sessionId: string) => {
    try {
      await chatSessionOperation('delete', sessionId);
      
      if (currentSession?.uuid === sessionId) {
        setCurrentSession(null);
        setMessages([]);
        setEditedCode('');
      }
    } catch (error) {
      console.error('Failed to delete session:', error);
    }
  };

  // Handle code changes
  const handleCodeChange = (code: string) => {
    setEditedCode(code);
  };

  // Handle run code
  const handleRunCode = () => {
    // Force Sandpack to recompile by changing the key
    console.log('Running code:', editedCode);
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle Enter key in prompt input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerateCode();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] via-[#0C0C0C] to-[#001122]">
      <div className="flex h-screen pt-16">
        {/* Left Sidebar - Chat Sessions */}
        <div className="w-80 bg-white/5 backdrop-blur-sm border-r border-white/10 p-4">
          <div className="mb-4">
            <h2 className="text-white font-bold text-lg mb-2">Chat Sessions</h2>
            {user && (
              <p className="text-gray-400 text-sm">Welcome, {user.fullName}!</p>
            )}
          </div>
          <ChatSessions
            currentSession={currentSession}
            onSessionSelect={selectSession}
            onSessionDelete={deleteSession}
            onNewSession={createNewSession}
          />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 p-4">
            <h1 className="text-2xl font-bold text-white text-center">
              AI Code Generator
            </h1>
            <p className="text-gray-300 text-center text-sm mt-1">
              Generate, preview, edit, and download code with AI assistance
            </p>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-3xl rounded-2xl p-4 ${
                    message.sender === 'user'
                      ? 'bg-[#00FFB3] text-black'
                      : 'bg-white/10 text-white border border-white/20'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${
                      message.sender === 'user' ? 'bg-black' : 'bg-[#00FFB3]'
                    }`}></div>
                    <span className="text-xs font-semibold">
                      {message.sender === 'user' ? 'You' : 'AI Assistant'}
                    </span>
                    <span className="text-xs opacity-70">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  {message.sender === 'ai' && message.code ? (
                    <>
                      {/* Code Editor - Prominently displayed */}
                      <div className="mt-3">
                        <ReactCodeEditor
                          code={message.code}
                          onCodeChange={(code) => {
                            // Update the message code
                            const updatedMessages = messages.map(m => 
                              m._id === message._id ? { ...m, code } : m
                            );
                            setMessages(updatedMessages);
                          }}
                          onRunCode={handleRunCode}
                          isRunning={isLoading}
                        />
                      </div>
                      
                      {/* Description below the code */}
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-sm text-gray-300">
                          Here's your React component based on your request. You can edit, preview, and download the code above.
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm">
                      {message.content}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-end">
                <div className="bg-white/10 text-white border border-white/20 rounded-2xl p-4 max-w-3xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#00FFB3]"></div>
                    <span className="text-xs font-semibold">AI Assistant</span>
                    <div className="w-4 h-4 border-2 border-[#00FFB3] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="text-sm">Generating code...</div>
                </div>
              </div>
            )}
            
            {/* Scroll to bottom anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Input - Centered */}
          <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-black/30 border border-white/20 rounded-2xl p-4">
                <div className="flex space-x-3">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe what you want to create... (e.g., Create a React button component with hover effects and TypeScript)"
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 resize-none"
                    rows={2}
                    disabled={isLoading}
                  />
                  
                  <button
                    onClick={handleGenerateCode}
                    disabled={isLoading || !prompt.trim()}
                    className="bg-gradient-to-r from-[#00FFB3] to-[#0074D9] text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center space-x-2 self-end"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send</span>
                      </>
                    )}
                  </button>
                </div>
                
                {error && (
                  <div className="text-red-400 text-sm bg-red-900/20 border border-red-500/30 rounded-lg p-3 mt-3">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 