// api/proxy.js
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://radio-station-website-client.onrender.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  const { type } = req.query;
  
  if (type === 'stream') {
    // Proxy the audio stream
    const response = await fetch('https://sapircast.caster.fm:17962/u2ceg');
    response.body.pipe(res);
  } else if (type === 'status') {
    // Proxy the status JSON
    const response = await fetch('https://sapircast.caster.fm:17962/status-json.xsl');
    const data = await response.json();
    res.json(data);
  }
}