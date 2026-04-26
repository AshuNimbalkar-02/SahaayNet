const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Data
let participations = [];

app.get('/', (req, res) => {
  res.send('SahaayNet API is running...');
});

// Participation Endpoints
app.get('/api/participations', (req, res) => {
  res.json(participations);
});

app.post('/api/participations', (req, res) => {
  const newParticipation = {
    id: Date.now(),
    ...req.body,
    date: new Date().toLocaleDateString(),
    status: 'Verified Submission'
  };
  participations.push(newParticipation);
  res.status(201).json(newParticipation);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
