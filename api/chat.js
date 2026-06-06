// Vercel Serverless Function: API Chat Handler
// Bridges directly to NVIDIA NIM (Llama 3.1 70B) for production live site.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, lang } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message content is required' });
  }

  // Retrieve NVIDIA API Key from Vercel Environment Variables
  const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;

  if (!NVIDIA_API_KEY) {
    console.error("NVIDIA_API_KEY is not configured in Vercel environment.");
    return res.status(500).json({ error: 'Server configuration error. API Key missing.' });
  }

  try {
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NVIDIA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta/llama-3.1-70b-instruct',
        messages: [
          { 
            role: 'system', 
            content: 'You are the Cosmic Guide, a helpful and premium AI assistant for Nth Dimension Academy, owned by MCT Navakanth Reddy Dumpa. Help visitors learn about Microsoft Fabric (DP-700/DP-600) and Azure Databricks. Maintain a mystical yet highly professional tone. Keep responses short and punchy.' 
          },
          { role: 'user', content: message }
        ],
        stream: false // Using non-streaming for simplicity and Vercel timeout safety
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('NIM Error Response:', errorText);
      throw new Error(`NVIDIA API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "The cosmos is silent. Please try again.";

    // Send response back matching what AIAssistant expects for non-streaming
    // Wait, AIAssistant currently expects Server-Sent Events (SSE) streaming!
    // Let's format it as a single SSE event so we don't have to rewrite AIAssistant.jsx again.
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    res.write(`data: ${JSON.stringify({ content })}\n\n`);
    res.write(`data: [DONE]\n\n`);
    res.end();

  } catch (error) {
    console.error('API Chat Error:', error);
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });
    res.write(`data: ${JSON.stringify({ content: 'Apologies, Voyager. The dimensional link is unstable. Please check the API configuration.' })}\n\n`);
    res.write(`data: [DONE]\n\n`);
    res.end();
  }
}
