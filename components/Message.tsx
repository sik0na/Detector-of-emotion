
import React from 'react';
import type { Message as MessageType } from '../types';
import { Emotion } from '../types';
import { BotIcon } from './icons/BotIcon';
import { UserIcon } from './icons/UserIcon';

interface MessageProps {
  message: MessageType;
}

const EmotionBadge: React.FC<{ emotion: Emotion }> = ({ emotion }) => {
    const emotionColorMapping: Record<Emotion, string> = {
        [Emotion.Sadness]: 'bg-sadness/20 text-sadness',
        [Emotion.Joy]: 'bg-joy/20 text-joy',
        [Emotion.Love]: 'bg-love/20 text-love',
        [Emotion.Anger]: 'bg-anger/20 text-anger',
        [Emotion.Fear]: 'bg-fear/20 text-fear',
        [Emotion.Surprise]: 'bg-surprise/20 text-surprise',
        [Emotion.Neutral]: 'bg-neutral/20 text-neutral',
    };

    const colorClass = emotionColorMapping[emotion] || emotionColorMapping[Emotion.Neutral];

    return (
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full capitalize ${colorClass}`}>
            {emotion}
        </span>
    );
};


const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <BotIcon className="w-8 h-8 p-1.5 bg-gray-200 dark:bg-gray-700 text-blue-500 rounded-full" />
        </div>
      )}
      <div className="max-w-md lg:max-w-2xl">
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'
          }`}
        >
          <p className="whitespace-pre-wrap">{message.text}</p>
        </div>
        {!isUser && message.emotion && (
            <div className="mt-1.5 text-left">
                <EmotionBadge emotion={message.emotion} />
            </div>
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0">
          <UserIcon className="w-8 h-8 p-1.5 bg-gray-200 dark:bg-gray-700 text-gray-500 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default Message;
