# Complete API Testing Guide

## Prerequisites

1. **Start your server**: `npm start` or `node server.js`
2. **Base URL**: `http://localhost:4000`
3. **Testing Tool**: Use Postman, Thunder Client (VS Code), or curl commands

---

## Step 1: Authentication Routes Testing

### 1.1 User Signup
```http
POST http://localhost:4000/api/v1/auth/signup
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "fullName": "Test User"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "userId": "user_id_here",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

### 1.2 User Signin
```http
POST http://localhost:4000/api/v1/auth/signin
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id_here",
      "username": "testuser",
      "email": "test@example.com"
    }
  }
}
```

**⚠️ IMPORTANT: Copy the JWT token from signin response - you'll need it for all subsequent requests!**

---

## Step 2: AI Routes Testing (Requires Authentication)

**Add this header to ALL requests below:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### 2.1 Generate AI Response (Create New Chat)
```http
POST http://localhost:4000/api/v1/ai/generate
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE

{
  "prompt": "Create a simple HTML button with CSS styling that changes color on hover"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "AI response generated successfully",
  "data": {
    "chatSessionId": "uuid-here",
    "response": "Here's a simple HTML button with hover effects...",
    "code": "<button class=\"hover-button\">Click Me</button>\n<style>\n.hover-button { ... }\n</style>",
    "messageId": "message_id_here"
  }
}
```

### 2.2 Generate AI Response (Continue Existing Chat)
```http
POST http://localhost:4000/api/v1/ai/generate
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE

{
  "prompt": "Make the button bigger and add a shadow effect",
  "chatSessionId": "uuid-from-previous-response"
}
```

---

## Step 3: Chat Session Routes Testing

### 3.1 Create New Chat Session
```http
POST http://localhost:4000/api/v1/ai/sessions?action=create
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE

{
  "title": "My Custom Chat Session"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Chat session created successfully",
  "data": {
    "uuid": "session-uuid-here",
    "title": "My Custom Chat Session",
    "user": "user_id_here",
    "createdAt": "2025-07-26T...",
    "updatedAt": "2025-07-26T..."
  }
}
```

### 3.2 List All Chat Sessions
```http
GET http://localhost:4000/api/v1/ai/sessions?action=list
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Chat sessions retrieved successfully",
  "data": [
    {
      "uuid": "session-uuid-1",
      "title": "Create a simple HTML button...",
      "latestMessage": "Here's a simple HTML button...",
      "createdAt": "2025-07-26T...",
      "updatedAt": "2025-07-26T..."
    },
    {
      "uuid": "session-uuid-2",
      "title": "My Custom Chat Session",
      "latestMessage": null,
      "createdAt": "2025-07-26T...",
      "updatedAt": "2025-07-26T..."
    }
  ]
}
```

### 3.3 Get Specific Chat Session with Messages
```http
GET http://localhost:4000/api/v1/ai/sessions/SESSION_UUID_HERE?action=get
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Chat session retrieved successfully",
  "data": {
    "session": {
      "uuid": "session-uuid-here",
      "title": "Create a simple HTML button...",
      "user": "user_id_here",
      "latestMessage": "Here's a simple HTML button...",
      "createdAt": "2025-07-26T...",
      "updatedAt": "2025-07-26T..."
    },
    "messages": [
      {
        "sender": "user",
        "content": "Create a simple HTML button with CSS styling",
        "code": null,
        "htmlPreview": null,
        "createdAt": "2025-07-26T..."
      },
      {
        "sender": "ai",
        "content": "Here's a simple HTML button with hover effects...",
        "code": "<button class=\"hover-button\">Click Me</button>...",
        "htmlPreview": null,
        "createdAt": "2025-07-26T..."
      }
    ]
  }
}
```

### 3.4 Delete Chat Session
```http
DELETE http://localhost:4000/api/v1/ai/sessions/SESSION_UUID_HERE?action=delete
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Chat session deleted successfully"
}
```

---

## Step 4: Message Routes Testing

### 4.1 Get Messages for Specific Session
```http
GET http://localhost:4000/api/v1/ai/sessions/SESSION_UUID_HERE/messages?action=get
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Messages retrieved successfully",
  "data": [
    {
      "sender": "user",
      "content": "Create a simple HTML button",
      "code": null,
      "htmlPreview": null,
      "createdAt": "2025-07-26T..."
    },
    {
      "sender": "ai",
      "content": "Here's your button code...",
      "code": "<button>Click Me</button>",
      "htmlPreview": null,
      "createdAt": "2025-07-26T..."
    }
  ]
}
```

### 4.2 Update Message (Add HTML Preview)
```http
PUT http://localhost:4000/api/v1/ai/messages/MESSAGE_ID_HERE?action=update
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE

{
  "htmlPreview": "<!DOCTYPE html><html><head><title>Preview</title></head><body><button style='padding: 10px; background: blue; color: white;'>Click Me</button></body></html>"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Message updated successfully",
  "data": {
    "_id": "message_id_here",
    "sender": "ai",
    "content": "Here's your button code...",
    "code": "<button>Click Me</button>",
    "htmlPreview": "<!DOCTYPE html><html>...",
    "createdAt": "2025-07-26T...",
    "updatedAt": "2025-07-26T..."
  }
}
```

### 4.3 Delete Message
```http
DELETE http://localhost:4000/api/v1/ai/messages/MESSAGE_ID_HERE?action=delete
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Message deleted successfully"
}
```

---

## Step 5: Code Preview Routes Testing

### 5.1 Get Code Preview
```http
GET http://localhost:4000/api/v1/ai/preview/MESSAGE_ID_HERE
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Code preview retrieved successfully",
  "data": {
    "messageId": "message_id_here",
    "code": "<button class=\"hover-button\">Click Me</button>...",
    "htmlPreview": "<!DOCTYPE html><html>...",
    "hasCode": true
  }
}
```

### 5.2 Update Code Preview
```http
PUT http://localhost:4000/api/v1/ai/preview/MESSAGE_ID_HERE
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE

{
  "htmlPreview": "<!DOCTYPE html><html><head><title>Updated Preview</title><style>button{padding:15px;background:green;color:white;border:none;border-radius:5px;cursor:pointer;}button:hover{background:darkgreen;}</style></head><body><button>Enhanced Button</button></body></html>"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Code preview retrieved successfully",
  "data": {
    "messageId": "message_id_here",
    "code": "<button class=\"hover-button\">Click Me</button>...",
    "htmlPreview": "<!DOCTYPE html><html><head><title>Updated Preview</title>...",
    "hasCode": true
  }
}
```

---

## Testing Workflow (Recommended Order)

### Phase 1: Setup
1. **Start server**
2. **Signup** → Get user created
3. **Signin** → Get JWT token
4. **Copy JWT token** for all subsequent requests

### Phase 2: Basic AI Functionality
5. **Generate AI Response** (new chat) → Get chatSessionId and messageId
6. **Generate AI Response** (continue chat) → Verify session continuation

### Phase 3: Session Management
7. **List Chat Sessions** → Verify sessions are created
8. **Get Specific Session** → Verify messages are stored correctly
9. **Create Custom Session** → Test manual session creation

### Phase 4: Message Operations
10. **Get Messages** → Verify message retrieval
11. **Update Message** → Add HTML preview
12. **Get Code Preview** → Verify preview generation

### Phase 5: Cleanup (Optional)
13. **Delete Message** → Test message deletion
14. **Delete Session** → Test session cleanup

---

## Common Issues & Troubleshooting

### 1. Authentication Errors (401)
- **Issue**: Missing or invalid JWT token
- **Solution**: Ensure `Authorization: Bearer YOUR_TOKEN` header is included

### 2. Session Not Found (404)
- **Issue**: Using wrong session UUID or session doesn't belong to user
- **Solution**: Use correct UUID from previous responses

### 3. Missing Environment Variables
- **Issue**: Gemini API not working
- **Solution**: Verify `GEMINI_API_KEY` in .env file

### 4. Database Connection Issues
- **Issue**: MongoDB connection failed
- **Solution**: Check `DEV_MONGODB_URI` in .env file

---

## Test Data Examples

### Sample Prompts for AI Generation:
```json
{
  "prompt": "Create a React todo list component with add, delete, and toggle functionality"
}

{
  "prompt": "Build a responsive CSS navigation bar with dropdown menus"
}

{
  "prompt": "Generate a Python function to calculate fibonacci numbers"
}

{
  "prompt": "Create a JavaScript function to validate email addresses"
}
```

### Sample HTML Preview:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Preview</title>
    <style>
        body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
        .container { max-width: 1200px; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Your generated code here -->
    </div>
</body>
</html>
```

This guide should help you thoroughly test all your API endpoints! Start with Phase 1 and work through each phase systematically.