// proxy.js
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Proxy endpoint: expects a query parameter "url"
app.get('/proxy', async (req, res) => {
  const targetURL = req.query.url;
  if (!targetURL) {
    return res.status(400).send('Error: "url" query parameter is required.');
  }

  try {
    // Fetch the target resource using axios.
    const response = await axios.get(targetURL, { responseType: 'arraybuffer' });
    
    // Set CORS header so that your client can access the data
    res.set('Access-Control-Allow-Origin', '*');
    
    // Preserve the content type of the fetched resource
    res.set('Content-Type', response.headers['content-type'] || 'application/octet-stream');
    
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching target URL:', error.message);
    res.status(500).send('Error fetching the target URL');
  }
});

app.listen(port, () => {
    console.log(`Proxy server is listening on http://localhost:${port}`);
  });
