const express = require('express');
const axios = require('axios');
const env = require('dotenv');
const app = express();
const PORT = 5000; // Choose a port for your proxy server
const cors = require('cors');

app.use(express.json());
app.use(cors());
// Load environment variables from .env file
env.config();

app.post('/graphql', async (req, res) => {
    const { query, variables } = req.body;
    const apiKey = process.env.REPORT_RESULTS_API_KEY;
  
    try {
      const response = await axios.post(process.env.REPORT_RESULTS_API_ENDPOINT, {
        query,
        variables
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiKey
        }
      });
  
      res.json(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error proxying request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
