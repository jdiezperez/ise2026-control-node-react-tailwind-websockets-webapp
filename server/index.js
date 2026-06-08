require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const path = require('path');

const { Client } = require('node-osc');

const app = express();
const PORT = process.env.CONTROL_PORT || 3000;
const OSC_IP = process.env.OSC_IP || '127.0.0.1';
const OSC_PORT = parseInt(process.env.OSC_PORT) || 10000;

const oscClient = new Client(OSC_IP, OSC_PORT);

app.use(cors());
app.use(express.json());

// OSC Endpoint
app.post('/api/osc', (req, res) => {
  const { address, args } = req.body;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  console.log(`Sending OSC: ${address} ${args ? JSON.stringify(args) : ''}`);

  try {
    if (args && Array.isArray(args)) {
      oscClient.send(address, ...args);
    } else if (args) {
      oscClient.send(address, args);
    } else {
      oscClient.send(address);
    }
    res.json({ success: true, message: `Sent ${address}` });
  } catch (error) {
    console.error('OSC Error:', error);
    res.status(500).json({ error: 'Failed to send OSC message' });
  }
});

// Serve static files from the React app
app.use('/control', express.static(path.join(__dirname, '../apps/control/dist')));

// API endpoint placeholder
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Control server is running' });
});

// Handle React routing, return all requests to React app
app.get('/control/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../apps/control/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Control Tool accessible at http://localhost:${PORT}/control`);
});
