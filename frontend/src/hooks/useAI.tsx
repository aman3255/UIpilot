import { useState } from 'react';
import { getApiUrl, API_CONFIG } from '../config/api';
import { 
  GenerateRequest, 
  GenerateResponse, 
  ChatSession, 
  Message, 
  ChatSessionAction, 
  MessageAction,
  ChatSessionResponse,
  MessageResponse,
  CodePreviewResponse
} from '../types/ai';

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('auth_token');
  };

  // Helper function for API calls
  const apiCall = async <T,>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> => {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  };

  // Generate AI response
  const generateCode = async (request: GenerateRequest): Promise<GenerateResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiCall<GenerateResponse>(
        getApiUrl(API_CONFIG.AI_ENDPOINTS.GENERATE),
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      );
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate code';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Chat Session operations
  const chatSessionOperation = async (
    action: ChatSessionAction,
    sessionId?: string,
    data?: any
  ): Promise<ChatSessionResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      let endpoint = getApiUrl(API_CONFIG.AI_ENDPOINTS.SESSIONS);
      let method = 'GET';

      switch (action) {
        case 'create':
          method = 'POST';
          endpoint += '?action=create';
          break;
        case 'list':
          endpoint += '?action=list';
          break;
        case 'get':
          endpoint += `/${sessionId}?action=get`;
          break;
        case 'delete':
          method = 'DELETE';
          endpoint += `/${sessionId}?action=delete`;
          break;
      }

      const options: RequestInit = { method };
      if (data && (action === 'create')) {
        options.body = JSON.stringify(data);
      }

      const response = await apiCall<ChatSessionResponse>(endpoint, options);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Chat session operation failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Message operations
  const messageOperation = async (
    action: MessageAction,
    sessionId?: string,
    messageId?: string,
    data?: any
  ): Promise<MessageResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      let endpoint = '';
      let method = 'GET';

      switch (action) {
        case 'get':
          endpoint = getApiUrl(`${API_CONFIG.AI_ENDPOINTS.SESSIONS}/${sessionId}/messages?action=get`);
          break;
        case 'update':
          method = 'PUT';
          endpoint = getApiUrl(`${API_CONFIG.AI_ENDPOINTS.MESSAGES}/${messageId}?action=update`);
          break;
        case 'delete':
          method = 'DELETE';
          endpoint = getApiUrl(`${API_CONFIG.AI_ENDPOINTS.MESSAGES}/${messageId}?action=delete`);
          break;
      }

      const options: RequestInit = { method };
      if (data && action === 'update') {
        options.body = JSON.stringify(data);
      }

      const response = await apiCall<MessageResponse>(endpoint, options);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Message operation failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Code Preview operations
  const codePreviewOperation = async (
    messageId: string,
    htmlPreview?: string
  ): Promise<CodePreviewResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = getApiUrl(`${API_CONFIG.AI_ENDPOINTS.PREVIEW}/${messageId}`);
      const method = htmlPreview ? 'PUT' : 'GET';

      const options: RequestInit = { method };
      if (htmlPreview) {
        options.body = JSON.stringify({ htmlPreview });
      }

      const response = await apiCall<CodePreviewResponse>(endpoint, options);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Code preview operation failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateCode,
    chatSessionOperation,
    messageOperation,
    codePreviewOperation,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}; 