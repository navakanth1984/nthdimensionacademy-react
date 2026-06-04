// Vercel Serverless Function: API Speak Handler
// Synthesizes voice audio segments (Te/En) using your backend or local NIM

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, lang } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text content is required' });
  }

  const NIM_SPEAK_URL = process.env.NIM_SPEAK_URL || 'http://localhost:8004/speak';

  try {
    const response = await fetch(NIM_SPEAK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, lang: lang || 'te' })
    });

    if (!response.ok) {
      throw new Error('NIM Speak local link failed.');
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('API Speak Error:', error);
    return res.status(500).json({ error: 'Voice synthesis service currently unavailable.' });
  }
}
