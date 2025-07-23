const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { transliterate } = require('transliteration');

const app = express();
const PORT = 5000;
const DB_FILE = './data/dictionary.json';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load dictionary
let dictionary = [];
if (fs.existsSync(DB_FILE)) {
  dictionary = JSON.parse(fs.readFileSync(DB_FILE));
}

// Search word
app.get('/api/words/:word', (req, res) => {
  const word = req.params.word.toLowerCase();
  const result = dictionary.find(
    (entry) =>
      entry.telugu.toLowerCase() === word ||
      entry.englishTransliteration.toLowerCase() === word
  );
  res.json(result || { error: 'Word not found' });
});

// Add word
app.post('/api/words', (req, res) => {
  const { telugu, meaning, partOfSpeech } = req.body;

  // Validation
  if (!telugu || !meaning || !partOfSpeech) {
    return res.status(400).json({ error: 'All fields required' });
  }
  if (!/^[ఀ-౿]+$/.test(telugu)) {
    return res.status(400).json({ error: 'Telugu script only' });
  }
  if (dictionary.some((entry) => entry.telugu === telugu)) {
    return res.status(400).json({ error: 'Word already exists' });
  }

  // Transliteration
  const englishTransliteration = transliterate(telugu);

  const newWord = {
    telugu,
    meaning,
    partOfSpeech,
    englishTransliteration,
    createdAt: new Date().toISOString(),
  };

  dictionary.push(newWord);
  fs.writeFileSync(DB_FILE, JSON.stringify(dictionary, null, 2));
  res.json({ message: 'Word added', word: newWord });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
