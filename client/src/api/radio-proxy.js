// api/radio-proxy.js
export default async function handler(req, res) {
  // Enable CORS for your site
  res.setHeader('Access-Control-Allow-Origin', 'https://radio-station-website-client.onrender.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { type } = req.query;
  const password = 'vmGoixyJlm'; // Replace with your actual password
  
  try {
    if (type === 'stream') {
      // For audio stream - include authentication
      const streamUrl = `https://source:${password}@sapircast.caster.fm:17962/u2ceg`;
      const response = await fetch(streamUrl);
      
      // Set proper headers for audio streaming
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Transfer-Encoding', 'chunked');
      
      // Pipe the stream
      response.body.pipe(res);
    } 
    else if (type === 'status') {
      // For status JSON - no auth needed
      const statusUrl = 'https://sapircast.caster.fm:17962/status-json.xsl';
      const response = await fetch(statusUrl);
      const data = await response.json();
      
      res.json(data);
    }
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch' });
  }
}