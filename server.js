import dotenv from 'dotenv';
dotenv.config(); // Must be called BEFORE initializing GoogleGenAI

import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(cors());
app.use(express.json());

// Pass the API key explicitly
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY 
});

const SYSTEM_PROMPT = `
You are Digital Buddy, a friendly assistant on a digital literacy platform.
Help users understand technology and identify scams in simple, accessible language.
`;

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  try {
    const contents = messages.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3.6-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.3,
      },
    });

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(chunk.text);
      }
    }

    res.end();
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to process request.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));