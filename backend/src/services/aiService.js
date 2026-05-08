import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const getAIReply = async (userMessage, intent) => {
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
       model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: 'system',
            content: `You are a helpful customer support assistant.
The user's issue appears to be about: ${intent}.
Give concise helpful replies.`
          },
          {
            role: 'user',
            content: userMessage
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.log(error.response?.data || error.message);
    return "AI service unavailable.";
  }
};

export default getAIReply;