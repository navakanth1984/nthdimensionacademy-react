// Vercel Serverless Function: API Chat Handler
// Bridges directly to Google Gemini API (gemini-2.5-flash) with robust streaming.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message content is required' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not configured in Vercel environment.");
    return res.status(500).json({ error: 'Server configuration error. API Key missing.' });
  }

  try {
    const systemInstruction = 
      "You are the Academy Assistant, a helpful and premium AI guide for Nth Dimension Academy, " +
      "owned by MCT Navakanth Reddy Dumpa. Help visitors learn about our training courses, Microsoft Fabric " +
      "(DP-700/DP-600), Azure Databricks, and Medallion Architecture. Maintain a mystical yet highly professional tone. " +
      "Keep responses engaging, structured, and concise.";

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
      console.error('Gemini API Error Response:', errorText);
      throw new Error(`Gemini API request failed with status ${response.status}`);
    }

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
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
          // Ignore JSON parse error on incomplete sequences
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
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });
    res.write(`data: ${JSON.stringify({ content: '\n\n[System Interface Malfunction] The cosmic link is currently unstable. Please try again later.' })}\n\n`);
    res.write(`data: [DONE]\n\n`);
    res.end();
  }
}
