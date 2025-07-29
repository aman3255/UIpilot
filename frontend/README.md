# UIpilot Frontend - React Component Generator

A React-based frontend for the UIpilot AI Code Generator platform that generates React components with TypeScript and provides a comprehensive code editing experience.

## 🚀 Features

- **AI React Component Generation**: Generate React components using Google Gemini AI with TypeScript
- **Advanced Code Editor**: Monaco Editor with syntax highlighting and autocompletion
- **Live Sandbox Preview**: Sandpack integration for real-time React component preview
- **Code Formatting**: Built-in code formatting and validation
- **Chat Session Management**: Create, view, and manage multiple chat sessions
- **Code Editing**: Edit generated code with full IDE features
- **Download & Copy**: Save React components as files or copy to clipboard
- **User Authentication**: Secure JWT-based authentication system
- **Chat History**: View complete conversation history with user and AI messages
- **Modern UI**: Beautiful, responsive design with Tailwind CSS

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **@codesandbox/sandpack-react** for live code preview
- **@uiw/react-codemirror** for code editing
- **Custom Hooks** for API integration

## 📋 Prerequisites

1. **Backend Server**: Make sure your backend is running on `http://localhost:8090`
2. **Environment Variables**: Ensure your backend has the required environment variables:
   - `GEMINI_API_KEY`
   - `JWT_SECRET_KEY`
   - `DEV_MONGODB_URI`
   - `PORT` (should be 8090)
3. **Node.js**: Version 16 or higher

## 🚀 Getting Started

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5173`

## 📖 Usage Guide

### 1. Authentication
- Click "Get Started" to sign up or log in
- The system uses JWT tokens stored in localStorage
- All AI operations require authentication

### 2. Chat Sessions
- **Create New Session**: Click the "+" button in the Chat Sessions sidebar
- **Select Session**: Click on any existing session to load its messages
- **Delete Session**: Click the trash icon next to a session
- **Session History**: View all your previous conversations

### 3. React Component Generation
- **Enter Prompt**: Describe the React component you want to create
  - Example: "Create a React button component with hover effects and TypeScript"
  - Example: "Build a React todo list component with add, delete, and toggle functionality"
  - Example: "Generate a React form component with validation and error handling"
- **Generate Code**: Click "Generate Code" to get AI-generated React component
- **View Results**: See the generated TypeScript React component

### 4. Code Editor Features
- **Monaco Editor**: Full-featured code editor with syntax highlighting
- **Language Detection**: Automatically detects TypeScript/React syntax
- **Auto-completion**: Intelligent code suggestions
- **Error Highlighting**: Real-time error detection
- **Code Formatting**: Click "Format" to beautify your code

### 5. Live Preview
- **Sandpack Integration**: Real-time React component preview
- **Hot Reload**: See changes instantly as you edit
- **Sandboxed Environment**: Safe code execution
- **React DevTools**: Full React debugging capabilities

### 6. Code Management
- **Edit Code**: Modify the generated React component
- **Live Preview**: See changes in real-time Sandpack preview
- **Copy Code**: Click "Copy" to copy component code to clipboard
- **Download**: Click "Download" to save as .tsx file

### 7. Chat History
- **View Messages**: See all user prompts and AI responses
- **Code Blocks**: Generated React components are displayed with syntax highlighting
- **Timestamps**: Each message shows when it was created

## 🏗 Project Structure

```
src/
├── components/              # React components
│   ├── AuthModal.tsx       # Authentication modal
│   ├── ChatSessions.tsx    # Chat session management
│   ├── CodeGenerator.tsx   # Main code generation interface
│   ├── ReactCodeEditor.tsx # Advanced code editor with Sandpack
│   ├── Footer.tsx          # Footer component
│   ├── Hero.tsx            # Hero section
│   └── Navbar.tsx          # Navigation bar
├── config/
│   └── api.ts              # API configuration (port 8090)
├── hooks/
│   ├── useAI.tsx           # AI API operations hook
│   └── useAuth.tsx         # Authentication hook
├── pages/                  # Page components
│   ├── About.tsx
│   ├── Blog.tsx
│   ├── Home.tsx            # Main landing page
│   └── HowItWorks.tsx
├── types/
│   ├── auth.ts             # Authentication types
│   └── ai.ts               # AI and chat session types
├── App.tsx                 # Main app component
└── main.tsx                # App entry point
```

## 🔌 API Integration

The frontend is designed to work with your exact backend API structure:

### Authentication Endpoints
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/signin` - User login

### AI Endpoints
- `POST /api/v1/ai/generate` - Generate React components
- `POST /api/v1/ai/sessions?action=create` - Create chat session
- `GET /api/v1/ai/sessions?action=list` - List chat sessions
- `GET /api/v1/ai/sessions/:sessionId?action=get` - Get session with messages
- `DELETE /api/v1/ai/sessions/:sessionId?action=delete` - Delete session

### Message Endpoints
- `GET /api/v1/ai/sessions/:sessionId/messages?action=get` - Get messages
- `PUT /api/v1/ai/messages/:messageId?action=update` - Update message
- `DELETE /api/v1/ai/messages/:messageId?action=delete` - Delete message

### Code Preview Endpoints
- `GET /api/v1/ai/preview/:messageId` - Get code preview
- `PUT /api/v1/ai/preview/:messageId` - Update code preview

## 🗄 Database Schema Integration

The frontend types match your Mongoose schema exactly:

### User Schema
```typescript
interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
```

### Chat Session Schema
```typescript
interface ChatSession {
  uuid: string;
  title: string;
  user: string;
  latestMessage?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Message Schema
```typescript
interface Message {
  _id: string;
  chatSession: string;
  sender: 'user' | 'ai';
  content: string;
  code?: string;
  htmlPreview?: string;
  createdAt: string;
  updatedAt: string;
}
```

## 🛠 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Configuration

The API base URL is configured in `src/config/api.ts`:
```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8090',
  // ... endpoints
};
```

## 🧪 Testing the Integration

### 1. Backend Setup
```bash
cd backend
npm install
# Set up your .env file with required variables
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. Test Flow
1. **Sign up** with a new account
2. **Create a chat session**
3. **Generate React component** with a prompt like "Create a React button component with hover effects and TypeScript"
4. **Edit the component** in the Monaco editor
5. **Preview in Sandpack** to see live React component
6. **Download or copy** the final React component

## 🔧 Troubleshooting

### Common Issues

1. **Backend Connection Error**
   - Ensure backend is running on port 8090
   - Check `src/config/api.ts` for correct BASE_URL

2. **Authentication Issues**
   - Verify JWT tokens in localStorage
   - Check backend JWT_SECRET_KEY configuration

3. **AI Generation Fails**
   - Ensure GEMINI_API_KEY is set in backend .env
   - Check network tab for API errors

4. **Sandpack Preview Not Working**
   - Verify generated code is valid React/TypeScript
   - Check browser console for errors
   - Ensure code has proper imports and exports

5. **Code Editor Issues**
   - Check if all CodeMirror dependencies are installed
   - Verify TypeScript configuration

### Debug Tips

- Open browser developer tools
- Check Network tab for failed API requests
- Look at Console for JavaScript errors
- Verify localStorage contains auth tokens
- Test API endpoints directly with Postman
- Check Sandpack console for React errors

## 🎯 Key Features Implemented

✅ **React Component Generation**: AI generates TypeScript React components
✅ **Monaco Editor Integration**: Full-featured code editor with syntax highlighting
✅ **Sandpack Live Preview**: Real-time React component preview with hot reload
✅ **Code Formatting**: Built-in code beautification and validation
✅ **Complete Backend Integration**: All API endpoints match your backend structure
✅ **Mongoose Schema Compliance**: Types match your database models exactly
✅ **Chat Session Management**: Full CRUD operations for sessions
✅ **Message History**: Complete conversation tracking
✅ **Code Editing**: In-place code editing with live updates
✅ **File Operations**: Download and copy functionality
✅ **Authentication**: JWT-based auth with proper token management
✅ **Error Handling**: Comprehensive error handling and user feedback
✅ **Responsive Design**: Works on all device sizes

## 🚀 Example Prompts

Try these prompts to generate React components:

- "Create a React button component with hover effects and TypeScript"
- "Build a React todo list component with add, delete, and toggle functionality"
- "Generate a React form component with validation and error handling"
- "Create a React card component with image, title, and description"
- "Build a React navigation menu with dropdown functionality"
- "Generate a React modal component with backdrop and close functionality"
- "Create a React data table component with sorting and pagination"
- "Build a React carousel component with auto-play and navigation"

The frontend now perfectly integrates with your backend APIs, generates React components with TypeScript, and provides a comprehensive development experience with Monaco Editor and Sandpack! 🎉 