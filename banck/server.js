require('dotenv').config(); // ← carga el archivo .env
 console.log("CLAVE API CARGADA:", process.env.OPENAI_API_KEY);


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Usa la API key desde el archivo .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }]
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
  console.error('ERROR EN OPENAI:', error);
  res.status(500).json({ reply: 'Error al conectarse a OpenAI' });
}
}); 
