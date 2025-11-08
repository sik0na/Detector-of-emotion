
import React, { useRef, useEffect } from 'react';
import type { Message as MessageType } from '../types';
import Message from './Message';

interface ChatWindowProps {
  messages: MessageType[];
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-grow p-4 sm:p-6 space-y-6 overflow-y-auto">
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="flex items-center space-x-2">
            <div className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse delay-75"></div>
            <div className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse delay-150"></div>
          </div>
        </div>
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatWindow;
