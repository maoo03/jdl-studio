import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Example setup
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Docker + Node.js app!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
