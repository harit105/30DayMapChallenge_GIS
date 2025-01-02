import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Allow CORS for frontend requests

// Route to provide ESRI_API_KEY
app.get('/api/esri-key', (req, res) => {
    res.json({ apiKey: process.env.ESRI_API_KEY });
});

// OpenAI API Route
app.post('/api/openai', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use OpenAI API key from .env
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 100,
            }),
        });

        const data = await response.json();
        res.json({ insight: data.choices[0].message.content });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({ error: 'Failed to fetch OpenAI insight' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
