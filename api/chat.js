// Vercel Serverless Function: API Chat Handler
// Bridges directly to Google Gemini API (gemini-2.5-flash) with robust streaming and graceful fallback signaling.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body || {};

  if (!message) {
    return res.status(400).json({ error: 'Message content is required' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY is not configured in environment. Signaling client fallback.");
    return res.status(503).json({ 
      error: 'GEMINI_API_KEY is not configured in Vercel environment.', 
      fallback: true 
    });
  }

  try {
    const systemInstruction = 
      "You are the Academy Assistant & Cosmic Guide, a helpful and premium AI guide for Nth Dimension Academy, " +
      "founded by MCT Navakanth Reddy Dumpa. Guide learners through Microsoft Fabric (DP-700, DP-600, DP-750), " +
      "Azure SQL AI-Enabled Databases (DP-800), Generative AI (AI-103), and Azure Data Fundamentals (DP-900). " +
      "Always provide actionable, structured, and encouraging responses. When relevant, invite them to explore our " +
      "Interactive Atlases (https://nthdimensionacademy.com/dp700-atlas/), take the 2-Minute Certification Matcher, " +
      "or connect with MCT Navakanth on WhatsApp (+91-6304980314). Maintain a mystical yet highly professional tone.";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: message }]
            }
          ],
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.7
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error Response:', response.status, errorText);
      throw new Error(`Gemini API request failed with status ${response.status}`);
    }

    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      
      const regex = /"text":\s*"((?:[^"\\]|\\.)*)"/g;
      let match;
      let lastIndex = 0;
      
      while ((match = regex.exec(buffer)) !== null) {
        const textVal = match[1];
        try {
          const rawText = JSON.parse(`"${textVal}"`);
          if (rawText) {
            res.write(`data: ${JSON.stringify({ content: rawText })}\n\n`);
          }
        } catch (e) {
          // Ignore JSON parse error on incomplete chunks
        }
        lastIndex = regex.lastIndex;
      }
      
      if (lastIndex > 0) {
        buffer = buffer.substring(lastIndex);
      }
    }

    res.write(`data: [DONE]\n\n`);
    res.end();

  } catch (error) {
    console.error('API Chat Error:', error);
    if (!res.headersSent) {
      return res.status(503).json({ 
        error: 'Gemini API link temporarily unavailable.', 
        fallback: true 
      });
    }
    res.write(`data: ${JSON.stringify({ content: '\n\n[Notice: Real-time Gemini link interrupted. Please explore our interactive atlases or chat with MCT Navakanth on WhatsApp (+91-6304980314).]' })}\n\n`);
    res.write(`data: [DONE]\n\n`);
    res.end();
  }
}
