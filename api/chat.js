// Vercel Serverless Function: API Chat Handler
// Bridges to local NIM backend or falls back to OpenRouter / Gemini API

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, lang } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message content is required' });
  }

  // Retrieve API Keys from Vercel Environment Variables
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  const NIM_BACKEND_URL = process.env.NIM_BACKEND_URL || 'http://localhost:8004/chat';

  // Set up SSE headers for streaming responses
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  try {
    // Phase 1: Try OpenRouter/Gemini if API Key is configured
    if (OPENROUTER_API_KEY) {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://nth-dimension-react.vercel.app',
          'X-Title': 'Nth Dimension Academy'
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-pro',
          messages: [
            { 
              role: 'system', 
              content: 'You are the Cosmic Guide, a helpful and premium AI assistant for Nth Dimension Academy, owned by MCT Navakanth Reddy Dumpa. Help visitors learn about Microsoft Fabric (DP-700/DP-600) and Azure Databricks. Maintain a mystical yet highly professional tone.' 
            },
            { role: 'user', content: message }
          ],
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error('OpenRouter API request failed.');
      }

      const reader = response.body;
      // Stream chunks to client
      for await (const chunk of reader) {
        res.write(chunk);
      }
      res.end();
      return;
    }

    // Phase 2: Fallback to local NIM backend
    const response = await fetch(NIM_BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, lang: lang || 'en' })
    });

    if (!response.ok) {
      throw new Error('NIM local link failed.');
    }

    const reader = response.body;
    for await (const chunk of reader) {
      res.write(chunk);
    }
    res.end();

  } catch (error) {
    console.error('API Chat Error:', error);
    // Send standard error chunk in SSE format
    res.write(`data: ${JSON.stringify({ content: 'Apologies, Voyager. The dimensional link is unstable. Please check your credentials.' })}\n\n`);
    res.end();
  }
}
