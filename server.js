import dotenv from 'dotenv';
dotenv.config(); // Must be called BEFORE initializing GoogleGenAI

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { GoogleGenAI } from '@google/genai';
import { analyzeMessageContent } from './scamAnalyzer.js';

const app = express();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import AfricasTalking from 'africastalking';

const africastalking = AfricasTalking({
  username: process.env.AFRICASTALKING_USERNAME,
  apiKey: process.env.AFRICASTALKING_API_KEY,
});

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

app.post('/api/analyze-screenshot', upload.single('screenshot'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No screenshot was uploaded.',
      });
    }

    console.log('Screenshot received:', req.file.originalname);

    const base64Image = req.file.buffer.toString('base64');

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `
Read the screenshot carefully.

Extract ONLY the main message that the user wants to check.

Do not describe the image.
Do not explain what you see.
Do not add information that is not in the screenshot.

Return only the exact readable message text.
If there are multiple messages, combine them in their original order.
              `,
            },
            {
              inlineData: {
                mimeType: req.file.mimetype,
                data: base64Image,
              },
            },
          ],
        },
      ],
    });

    const extractedText = response.text?.trim();

    if (!extractedText) {
      return res.status(422).json({
        error: 'Could not extract readable text from the screenshot.',
      });
    }

    console.log('Extracted screenshot text:', extractedText);

    const analysis = analyzeMessageContent(extractedText);

    console.log('SCREENSHOT ANALYSIS:', analysis);

    return res.json({
      extractedText,
      analysis,
    });
  } catch (error) {
    console.error('Screenshot analysis error:', error);

    return res.status(500).json({
      error: 'Failed to analyze screenshot.',
    });
  }
});


app.post('/ussd', async (req, res) => {
  const {
    sessionId,
    serviceCode,
    phoneNumber,
    text,
  } = req.body;

  console.log('USSD Request:', {
    sessionId,
    serviceCode,
    phoneNumber,
    text,
  });

  try {
    // First screen
    if (text === '') {
      return res
        .status(200)
        .type('text/plain')
        .send(
          'CON Welcome to Digital Buddy\n' +
          'Stay safe from online scams.\n\n' +
          '1. Check a message\n' +
          '2. Safety tips\n' +
          '3. Exit'
        );
    }

    // User selected scam checking
    if (text === '1') {
      return res
        .status(200)
        .type('text/plain')
        .send('CON Enter the suspicious message:');
    }

    // Safety tips
    if (text === '2') {
      return res
        .status(200)
        .type('text/plain')
        .send(
          'END SAFETY TIPS\n\n' +
          'Never share your PIN.\n' +
          'Do not send money to claim prizes.\n' +
          'Verify suspicious messages before acting.'
        );
    }

    // Exit
    if (text === '3') {
      return res
        .status(200)
        .type('text/plain')
        .send('END Thank you for using Digital Buddy.');
    }

    // User has entered a suspicious message
    if (text.startsWith('1*')) {
      const suspiciousMessage = text.substring(2);

      console.log('Message to analyze:', suspiciousMessage);

   const result = analyzeMessageContent(suspiciousMessage);

console.log('SCAM DETECTOR RESULT:', result);

const analysis =
  `RISK: ${result.riskLevel}\n` +
  `SCORE: ${result.score}/100\n` +
  `CATEGORY: ${result.scamCategory}\n` +
  `WHY: ${result.warningSigns.map(sign => sign.type).join(', ')}`;

console.log('FINAL ANALYSIS:', analysis);
      // USSD response
      return res
        .status(200)
        .type('text/plain')
        .send(`END ${analysis}`);
    }

    // Unknown input
    return res
      .status(200)
      .type('text/plain')
      .send('END Invalid option. Please try again.');

  } catch (error) {
    console.error('USSD Gemini Error:', error);

    return res
      .status(200)
      .type('text/plain')
      .send(
        'END Sorry, we could not analyze the message right now. Please try again later.'
      );
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));