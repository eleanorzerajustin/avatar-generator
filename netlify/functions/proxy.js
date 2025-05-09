const axios = require('axios');

exports.handler = async function(event) {
  const targetURL = event.queryStringParameters.url;

  if (!targetURL) {
    return {
      statusCode: 400,
      body: 'Missing URL parameter',
    };
  }

  try {
    const response = await axios.get(targetURL, { responseType: 'arraybuffer' });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Access-Control-Allow-Origin': '*',
      },
      body: Buffer.from(response.data, 'binary').toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error fetching SVG: ' + error.message,
    };
  }
};
