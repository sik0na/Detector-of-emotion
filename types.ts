
export enum Emotion {
  Admiration = 'admiration',
  Amusement = 'amusement',
  Anger = 'anger',
  Annoyance = 'annoyance',
  Approval = 'approval',
  Caring = 'caring',
  Confusion = 'confusion',
  Curiosity = 'curiosity',
  Desire = 'desire',
  Disappointment = 'disappointment',
  Disapproval = 'disapproval',
  Disgust = 'disgust',
  Embarrassment = 'embarrassment',
  Excitement = 'excitement',
  Fear = 'fear',
  Gratitude = 'gratitude',
  Grief = 'grief',
  Joy = 'joy',
  Love = 'love',
  Nervousness = 'nervousness',
  Optimism = 'optimism',
  Pride = 'pride',
  Realization = 'realization',
  Relief = 'relief',
  Remorse = 'remorse',
  Sadness = 'sadness',
  Surprise = 'surprise',
  Neutral = 'neutral',
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  emotion?: Emotion;
}
