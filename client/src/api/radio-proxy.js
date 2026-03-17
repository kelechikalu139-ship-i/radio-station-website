// Example: app.js or server.js on your Render backend
import express from 'express';
import fetch from 'node-fetch'; // or use axios
import cors from 'cors';

const app = express();

// Enable CORS for your frontend
app.use(cors({
  origin: 'https://radio-station-website-client.onrender.com', // Allow only your frontend
  methods: ['GET'],
}));

// Proxy endpoint for stream (audio data)
app.get('/api/radio-proxy', async (req, res) => {
  const { type } = req.query;

  if (type === 'stream') {
    try {
      // The actual Sternhost stream URL
      const streamUrl = 'https://radio.sternhost.com/radio.mp3';
      
      // Fetch the stream from Sternhost
      const response = await fetch(streamUrl);
      
      // Forward the correct headers
      res.set({
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-cache',
      });
      
      // Pipe the stream directly to the client
      response.body.pipe(res);
    } catch (error) {
      console.error('Stream proxy error:', error);
      res.status(500).send('Stream unavailable');
    }
  } 
  else if (type === 'status') {
    try {
      // Use your actual AzuraCast API URL and key from environment variables
      const apiUrl = process.env.VITE_AZURACAST_API_URL;
      const apiKey = process.env.VITE_AZURACAST_API_KEY;
      const stationId = process.env.VITE_STATION_ID || '1149';
      
      // Fetch now-playing data from Sternhost's AzuraCast API
      const response = await fetch(`${apiUrl}/api/nowplaying/${stationId}`, {
        headers: {
          'X-API-Key': apiKey,
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`API responded with ${response.status}`);
      }
      
      const data = await response.json();
      
      // Send the data to your frontend
      res.json(data);
    } catch (error) {
      console.error('Status proxy error:', error);
      res.status(500).json({ error: 'Could not fetch now playing data' });
    }
  } else {
    res.status(400).send('Invalid request type');
  }
});

app.listen(3000, () => {
  console.log('Proxy server running on port 3000');
});