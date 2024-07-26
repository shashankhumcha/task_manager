require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); 
const taskRoutes = require('./routes/tasks'); 
const verifyToken = require('./middleware/verifyToken');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', verifyToken, taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
