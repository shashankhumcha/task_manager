const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Example API route
app.get('/api', (req, res) => {
  res.send('API endpoint is working!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
