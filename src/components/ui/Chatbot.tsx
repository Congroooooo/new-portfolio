import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';
import {
  MessageCircleIcon,
  SendIcon,
  XIcon,
  BotIcon,
} from '@/components/icons';
import type { ChatMessage, ChatApiResponse, ChatApiError } from '@/types';
import NixAILogo from '@/assets/NixAILogo.png';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hi 👋, I'm Nix, Nicko's AI assistant. How can I help you explore his work?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      // Prepare conversation history (excluding the welcome message)
      const conversationHistory = messages
        .slice(1) // Skip welcome message
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        const errorData: ChatApiError = await response.json();
        throw new Error(errorData.message || 'Failed to get response');
      }

      const data: ChatApiResponse = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(data.timestamp),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);

      // Add error message to chat
      const errorChatMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `❌ ${errorMessage}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorChatMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  return (
    <>
      {/* Welcome Message */}
      {showWelcome && !isOpen && (
        <div
          className={cn(
            'fixed right-4 bottom-20 z-40',
            'max-w-[280px] rounded-2xl',
            'bg-[#111111]/95 backdrop-blur-xl',
            'border border-white/20',
            'shadow-[0_0_40px_rgba(255,255,255,0.2)]',
            'p-4',
            'animate-in slide-in-from-bottom-4 fade-in duration-500'
          )}
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-sm leading-relaxed text-white">
                Hi 👋, I'm <span className="font-semibold">Nix</span>, Nicko's
                AI assistant. How can I help you explore his work?
              </p>
            </div>
            <button
              onClick={() => setShowWelcome(false)}
              className="flex-shrink-0 rounded-lg p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Dismiss welcome message"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowWelcome(false);
        }}
        className={cn(
          'fixed right-4 bottom-4 z-50',
          'h-12 w-12 rounded-full',
          'border border-white/20 bg-[#111111]',
          'text-white shadow-[0_0_30px_rgba(255,255,255,0.15)]',
          'hover:bg-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]',
          'transition-all duration-300 ease-in-out',
          'hover:scale-110 active:scale-95',
          'flex items-center justify-center',
          'backdrop-blur-sm',
          'overflow-hidden',
          isOpen && 'rotate-90'
        )}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <img
            src={NixAILogo}
            alt="Nix AI"
            className="h-11 w-11 object-cover"
          />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            'fixed right-4 bottom-20 z-40',
            'h-[450px] w-[340px]',
            'bg-[#0a0a0a]/95 backdrop-blur-xl',
            'rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.8)]',
            'flex flex-col overflow-hidden',
            'border border-white/10',
            'animate-in slide-in-from-bottom-4 fade-in duration-300'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#111111] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                <img
                  src={NixAILogo}
                  alt="Nix AI"
                  className="h-8 w-8 object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Nix</h3>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 space-y-3 overflow-x-hidden overflow-y-auto bg-[#0a0a0a] p-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:hover:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-3 py-2',
                    'break-words shadow-sm',
                    message.role === 'user'
                      ? 'bg-white text-[#0a0a0a] shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                      : 'border border-white/10 bg-[#111111]/80 text-white backdrop-blur-sm'
                  )}
                >
                  <p className="overflow-wrap-anywhere text-sm leading-relaxed break-words whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <span
                    className={cn(
                      'mt-1 block text-xs',
                      message.role === 'user'
                        ? 'text-[#0a0a0a]/60'
                        : 'text-white/40'
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-white/10 bg-[#111111]/80 px-3 py-2 shadow-sm backdrop-blur-sm">
                  <div className="flex gap-1">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:-0.3s]"></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:-0.15s]"></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 bg-[#111111] p-3">
            {error && (
              <div className="mb-2 rounded-lg border border-red-500/20 bg-red-500/10 p-2">
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about Nicko..."
                disabled={isLoading}
                rows={1}
                className={cn(
                  'flex-1 rounded-xl px-3 py-2 text-sm',
                  'border border-white/10 bg-[#0a0a0a]',
                  'text-white placeholder:text-white/40',
                  'focus:border-white/30 focus:ring-2 focus:ring-white/20 focus:outline-none',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                  'transition-all duration-200',
                  'max-h-[120px] resize-none overflow-y-auto',
                  'break-words whitespace-pre-wrap',
                  '[&::-webkit-scrollbar]:w-1.5',
                  '[&::-webkit-scrollbar-thumb]:rounded-full',
                  '[&::-webkit-scrollbar-thumb]:bg-white/10',
                  '[&::-webkit-scrollbar-track]:bg-transparent'
                )}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className={cn(
                  'rounded-xl px-3 py-2',
                  'bg-white font-medium text-[#0a0a0a]',
                  'hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]',
                  'active:scale-95',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                  'transition-all duration-200',
                  'flex items-center justify-center'
                )}
                aria-label="Send message"
              >
                <SendIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
