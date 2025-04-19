const express = require('express');
const app = express();
const axios = require('axios');

const PORT = process.env.PORT || 3000;

// Serve static files from public
app.use(express.static('public'));

// Proxy route
app.get('/proxy', async (req, res) => {
  const targetURL = req.query.url;
  if (!targetURL) return res.status(400).send('Missing "url" param');

  try {
    const response = await axios.get(targetURL, { responseType: 'arraybuffer' });
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', response.headers['content-type'] || 'application/octet-stream');
    res.send(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).send('Proxy failed');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
