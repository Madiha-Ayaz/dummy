const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

const DEEPSEEK_API_KEY = 'sk-1849090b0bc84dd4aad61b67f5031627'; // replace with your real key

app.post('/api/generate-ai', async (req, res) => {
  try {
    const { image, prompt } = req.body;

    const response = await axios.post(
      'https://platform.deepseek.com/api/images/generate',
      { image, prompt },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data?.data?.length > 0) {
      res.json({ output_url: response.data.data[0].url });
    } else {
      res.status(500).json({ error: 'No image returned from AI' });
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'AI generation failed' });
  }
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
