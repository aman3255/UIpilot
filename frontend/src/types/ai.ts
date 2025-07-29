// Chat Session interface matching Mongoose schema
export interface ChatSession {
  uuid: string;
  title: string;
  user: string;
  latestMessage?: string;
  createdAt: string;
  updatedAt: string;
}

// Message interface matching Mongoose schema
export interface Message {
  _id: string;
  chatSession: string;
  sender: 'user' | 'ai';
  content: string;
  code?: string;
  htmlPreview?: string;
  createdAt: string;
  updatedAt: string;
}

// AI Generation request
export interface GenerateRequest {
  prompt: string;
  chatSessionId?: string;
}

// AI Generation response
export interface GenerateResponse {
  success: boolean;
  message: string;
  data: {
    chatSessionId: string;
    response: string;
    code: string;
    messageId: string;
  };
}

// Chat Session API responses
export interface ChatSessionResponse {
  success: boolean;
  message: string;
  data: ChatSession | ChatSession[] | {
    session: ChatSession;
    messages: Message[];
  };
}

// Message API responses
export interface MessageResponse {
  success: boolean;
  message: string;
  data: Message | Message[];
}

// Code Preview API responses
export interface CodePreviewResponse {
  success: boolean;
  message: string;
  data: {
    messageId: string;
    code?: string;
    htmlPreview?: string;
    hasCode: boolean;
  };
}

// Chat Session actions
export type ChatSessionAction = 'create' | 'list' | 'get' | 'delete';

// Message actions
export type MessageAction = 'get' | 'update' | 'delete'; 