
export enum Emotion {
  Sadness = 'sadness',
  Joy = 'joy',
  Love = 'love',
  Anger = 'anger',
  Fear = 'fear',
  Surprise = 'surprise',
  Neutral = 'neutral',
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  emotion?: Emotion;
}
