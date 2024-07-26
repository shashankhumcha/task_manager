const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const db = require('../db');
const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); 

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      db.query('INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
        [firstName, lastName, email, hashedPassword], (err, results) => {
          if (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
          }

          const token = jwt.sign({ id: results.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.status(201).json({ token });
        });
    });
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  });
});

router.post('/google', async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email; 

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
      }

      let user;

      if (results.length > 0) {
        user = results[0];
      } else {
 
        db.query('INSERT INTO users (firstName, lastName, email) VALUES (?, ?, ?)',
          [payload.given_name, payload.family_name, email], (err, results) => {
            if (err) {
              return res.status(500).json({ message: 'Server error', error: err.message });
            }

            user = { id: results.insertId, email: email };

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
          });
        
        return;
      }


      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  } catch (error) {
    console.error('Google authentication failed', error);
    res.status(400).json({ message: 'Google authentication failed', error: error.message });
  }
});

module.exports = router;
