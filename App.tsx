
import React, { useState, useEffect } from 'react';
import type { Message } from './types';
import { Emotion } from './types';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import { getBotResponse } from './services/geminiService';
import { BotIcon } from './components/icons/BotIcon';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now(),
      sender: 'bot',
      text: 'Hello! I am Mindful Echo, your personal mental health companion. How are you feeling today?',
      emotion: Emotion.Neutral,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const botData = await getBotResponse(text);
      const newBotMessage: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botData.responseText,
        emotion: botData.emotion.toLowerCase() as Emotion,
      };
      setMessages((prev) => [...prev, newBotMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      const errorBotMessage: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        text: 'I apologize, but I seem to be having trouble connecting. Please check your API key and try again later.',
        emotion: Emotion.Sadness,
      };
      setMessages((prev) => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Add dark mode class to html element for Tailwind CSS dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <header className="flex items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <BotIcon className="w-8 h-8 text-blue-500" />
        <h1 className="ml-3 text-xl font-bold">Mindful Echo Chat</h1>
      </header>
      <ChatWindow messages={messages} isLoading={isLoading} />
      {error && (
        <div className="px-4 py-2 text-center text-red-500 bg-red-100 dark:bg-red-900/30">
          Error: {error}
        </div>
      )}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
