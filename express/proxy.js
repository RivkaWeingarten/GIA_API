const express = require('express');
const axios = require('axios');
const env = require('dotenv');
const cors = require('cors');
const path = require('path');

env.config(); // Load environment variables from .env file as early as possible

const app = express();
const PORT = process.env.PORT || 5000; // Use the port from .env or default to 5000

app.use(express.json());
app.use(cors());

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, '..', 'src', 'build')));

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, '../build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
  );
} else {
  
   app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Proxy endpoint to forward requests to the GraphQL API
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
    console.log(response.data);
  } catch (error) {
    console.error('Error proxying request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Catchall handler to serve React's index.html file for any unmatched routes
app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, '..', 'src', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
