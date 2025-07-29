import React, { useState, useEffect } from 'react';
import { Plus, Trash2, MessageSquare, Calendar } from 'lucide-react';
import { useAI } from '../hooks/useAI';
import { ChatSession } from '../types/ai';

interface ChatSessionsProps {
  currentSession: ChatSession | null;
  onSessionSelect: (session: ChatSession) => void;
  onSessionDelete: (sessionId: string) => void;
  onNewSession: () => void;
}

export const ChatSessions: React.FC<ChatSessionsProps> = ({
  currentSession,
  onSessionSelect,
  onSessionDelete,
  onNewSession
}) => {
  const { chatSessionOperation } = useAI();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load chat sessions
  const loadSessions = async () => {
    setIsLoading(true);
    try {
      const response = await chatSessionOperation('list');
      if (response.success && Array.isArray(response.data)) {
        setSessions(response.data as ChatSession[]);
      }
    } catch (error) {
      console.error('Failed to load sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getSessionTitle = (session: ChatSession) => {
    if (session.title && session.title !== 'New Chat') {
      return session.title;
    }
    return session.latestMessage 
      ? session.latestMessage.substring(0, 30) + (session.latestMessage.length > 30 ? '...' : '')
      : 'New Chat';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onNewSession}
          className="w-full bg-[#00FFB3] text-black p-3 rounded-xl font-semibold hover:bg-[#00CC8F] transition-colors flex items-center justify-center space-x-2"
        >
          <Plus size={16} />
          <span>New Chat</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="w-6 h-6 border-2 border-[#00FFB3] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
          {sessions.map((session) => (
            <div
              key={session.uuid}
              className={`group p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                currentSession?.uuid === session.uuid
                  ? 'bg-[#00FFB3]/20 border border-[#00FFB3]/30 shadow-lg'
                  : 'bg-white/5 hover:bg-white/10 border border-transparent'
              }`}
              onClick={() => onSessionSelect(session)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-sm font-medium truncate">
                    {getSessionTitle(session)}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar size={12} className="text-gray-400" />
                    <p className="text-gray-400 text-xs">
                      {formatDate(session.updatedAt)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSessionDelete(session.uuid);
                  }}
                  className="text-red-400 hover:text-red-300 p-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete Session"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          
          {sessions.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare size={48} className="text-gray-400 mx-auto mb-4 opacity-50" />
              <p className="text-gray-400 text-sm">No chat sessions yet</p>
              <p className="text-gray-500 text-xs mt-1">Create your first session to get started</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 