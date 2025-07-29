# 🚀 UIpilot - AI-Powered React Component Generator

<div align="center">

![UIpilot Logo](https://img.shields.io/badge/UIpilot-AI%20Code%20Generator-00FFB3?style=for-the-badge&logo=react&logoColor=black)

**Your Code, Your Playground** - Build, edit, and run React components in real-time with AI assistance

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.16.5-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI%20Model-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)

[Live Demo](#) • [Documentation](#documentation) • [Features](#-features) • [Tech Stack](#-tech-stack)

</div>

---

## 📖 Overview

UIpilot is a full-stack web application that leverages AI to generate, preview, edit, and download React components in real-time. Built with modern technologies, it provides a seamless development experience for creating React components with TypeScript support.

### 🎯 Key Features

- 🤖 **AI-Powered Code Generation** - Generate React components using Google Gemini AI
- ⚡ **Real-time Live Preview** - See your code running instantly with Sandpack integration
- 🎨 **Advanced Code Editor** - Monaco Editor with syntax highlighting and autocompletion
- 💾 **Chat Session Management** - Organize your coding sessions with persistent storage
- 🔐 **User Authentication** - Secure JWT-based authentication system
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🚀 **Instant Deployment** - Download generated components as ready-to-use files

---

## ✨ Features

### 🤖 AI Code Generation
- **Smart Prompts**: Describe what you want to create in natural language
- **React Components**: Generate TypeScript React components with inline styles
- **Code Quality**: AI ensures clean, working, and well-structured code
- **Type Safety**: Full TypeScript support with proper interfaces

### ⚡ Live Development Environment
- **Sandpack Integration**: Real-time React component preview with hot reload
- **Code Editor**: Full-featured Monaco Editor with syntax highlighting
- **Instant Preview**: See changes as you type with immediate compilation
- **Console Support**: Built-in console for debugging and logging

### 🎨 Advanced Code Management
- **Format Code**: Built-in code formatting and beautification
- **Copy to Clipboard**: One-click code copying
- **Download Files**: Save components as `.tsx` files
- **Version Control**: Track changes and manage code history

### 💬 Chat Session System
- **Multiple Sessions**: Create and manage multiple coding sessions
- **Conversation History**: Complete chat history with user prompts and AI responses
- **Session Persistence**: All sessions saved to MongoDB
- **Real-time Updates**: Instant synchronization across sessions

---

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development experience
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library

### Code Editing & Preview
- **@codesandbox/sandpack-react** - Live code sandbox and preview
- **@uiw/react-codemirror** - Advanced code editor with syntax highlighting
- **Monaco Editor** - Full-featured code editor (VS Code-like experience)
- **Dracula Theme** - Beautiful dark theme for code editing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing and security

### AI Integration
- **Google Gemini AI** - Advanced AI model for code generation
- **@google/generative-ai** - Official Google AI SDK

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Nodemon** - Auto-restart for development
- **CORS** - Cross-origin resource sharing

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud)
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/uipilot.git
   cd uipilot
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**

   Create `.env` file in the backend directory:
   ```env
   PORT=8090
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/uipilot
   JWT_SECRET=your_jwt_secret_here
   GEMINI_API_KEY=your_gemini_api_key_here
   DEV_GENERATIVE_MODEL=gemini-1.5-flash
   ```

4. **Start the servers**
   ```bash
   # Start backend (from backend directory)
   npm start
   
   # Start frontend (from frontend directory)
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8090

---

## 📁 Project Structure

```
UIpilot/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── models/         # Mongoose schemas
│   │   ├── routers/        # API routes
│   │   ├── middlewares/    # Express middlewares
│   │   └── database/       # Database connection
│   ├── server.js           # Main server file
│   └── package.json
├── frontend/               # React/TypeScript frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript interfaces
│   │   └── config/        # Configuration files
│   ├── index.html
│   └── package.json
└── README.md
```

---

## 🔧 API Documentation

### Authentication Endpoints
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/profile` - Get user profile

### AI Code Generation
- `POST /api/v1/ai/generate` - Generate React components with AI

### Chat Sessions
- `POST /api/v1/ai/sessions?action=create` - Create new chat session
- `GET /api/v1/ai/sessions?action=list` - List user's chat sessions
- `DELETE /api/v1/ai/sessions?action=delete&sessionId={uuid}` - Delete session

### Messages
- `GET /api/v1/ai/messages?sessionId={uuid}` - Get messages for a session
- `PUT /api/v1/ai/messages?action=update&messageId={id}` - Update message

### Code Preview
- `GET /api/v1/ai/code-preview?messageId={id}` - Get code preview
- `PUT /api/v1/ai/code-preview?messageId={id}` - Update code preview

---

## 🎯 Usage Examples

### Generate a React Button Component

1. **Navigate to the code editor**
   - Go to http://localhost:5173/code
   - Sign up or log in

2. **Create a new chat session**
   - Click "New Chat" in the sidebar

3. **Enter your prompt**
   ```
   Create a React button component with hover effects and TypeScript
   ```

4. **Generate and preview**
   - Click "Send" to generate the component
   - View the generated code in the editor
   - See the live preview in the Sandpack panel
   - Edit the code and see real-time updates

### Example Prompts

- "Create a React todo list component with add, delete, and toggle functionality"
- "Build a React form component with validation and error handling"
- "Generate a React card component with image, title, and description"
- "Create a React navigation menu with dropdown functionality"
- "Build a React modal component with backdrop and close functionality"

---

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **CORS Protection** - Cross-origin request security
- **Input Validation** - Server-side validation for all inputs
- **Rate Limiting** - Protection against abuse
- **Environment Variables** - Secure configuration management

---

## 🚀 Deployment

### Backend Deployment (Heroku/ Railway/ Render)

1. **Set environment variables**
   ```env
   PORT=8090
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

2. **Deploy**
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Vercel/ Netlify)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder**

### Environment Variables for Frontend
```env
VITE_API_BASE_URL=https://your-backend-url.com
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** - For providing the AI capabilities
- **CodeSandbox** - For the amazing Sandpack integration
- **React Team** - For the incredible React framework
- **Vite Team** - For the lightning-fast build tool
- **Tailwind CSS** - For the utility-first CSS framework

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/uipilot/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/uipilot/discussions)
- **Email**: support@uipilot.com

---

<div align="center">

**Made with ❤️ by the UIpilot Team**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/uipilot?style=social)](https://github.com/yourusername/uipilot)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/uipilot?style=social)](https://github.com/yourusername/uipilot)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/uipilot)](https://github.com/yourusername/uipilot/issues)

</div>
