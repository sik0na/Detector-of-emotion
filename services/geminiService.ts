
import { GoogleGenAI, Type } from '@google/genai';
import { Emotion } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error('API_KEY environment variable not set');
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

const systemInstruction = `You are a compassionate and empathetic mental health chatbot. Your goal is to support users by understanding their feelings. 
Based on the user's message, first classify their emotion into one of the following categories: sadness, joy, love, anger, fear, surprise. 
If no strong emotion is detected, classify it as neutral.
Then, provide a short, supportive, and non-judgmental response. 
Always return your answer in a JSON format with two keys: 'emotion' and 'responseText'. 
The 'emotion' should be one of the seven categories, and 'responseText' should be your message to the user.`;

export const getBotResponse = async (
  userMessage: string
): Promise<{ emotion: Emotion; responseText: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            emotion: {
              type: Type.STRING,
              description:
                'The classified emotion: sadness, joy, love, anger, fear, surprise, or neutral.',
            },
            responseText: {
              type: Type.STRING,
              description:
                'A compassionate and supportive response to the user.',
            },
          },
          required: ['emotion', 'responseText'],
        },
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);

    // Validate the emotion from the response
    const emotionValues = Object.values(Emotion) as string[];
    if (!emotionValues.includes(parsedResponse.emotion.toLowerCase())) {
        throw new Error(`Invalid emotion received: ${parsedResponse.emotion}`);
    }

    return {
      emotion: parsedResponse.emotion.toLowerCase() as Emotion,
      responseText: parsedResponse.responseText,
    };
  } catch (error) {
    console.error('Error fetching from Gemini API:', error);
    throw new Error('Failed to get a response from the AI assistant.');
  }
};
