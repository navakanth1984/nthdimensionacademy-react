// Vercel Serverless Function: API Chat Handler
// Bridges directly to NVIDIA NIM (Llama 3.1 70B) with robust SSE streaming.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, lang } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message content is required' });
  }

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
            content: 'You are the Cosmic Guide, a helpful and premium AI assistant for Nth Dimension Academy, owned by MCT Navakanth Reddy Dumpa. Help visitors learn about Microsoft Fabric (DP-700/DP-600) and Azure Databricks. Maintain a mystical yet highly professional tone. Keep responses engaging and concise.' 
          },
          { role: 'user', content: message }
        ],
        stream: true,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('NIM Error Response:', errorText);
      throw new Error(`NVIDIA API request failed with status ${response.status}`);
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
      const lines = buffer.split('\n');
      buffer = lines.pop(); // Keep the last incomplete line in the buffer
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('data: ')) {
          const dataStr = trimmed.substring(6).trim();
          if (dataStr === '[DONE]') continue;
          try {
            const data = JSON.parse(dataStr);
            const content = data.choices?.[0]?.delta?.content;
            if (content) {
              res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
          } catch (e) {
            // Ignore incomplete JSON chunks from NVIDIA
          }
        }
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
