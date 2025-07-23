import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState(null);
  const [newWord, setNewWord] = useState({
    telugu: '',
    meaning: '',
    partOfSpeech: '',
  });
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/words/${searchTerm}`);
      setResult(response.data);
    } catch (error) {
      setResult({ error: 'Error fetching word' });
    }
  };

  const handleAddWord = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/words', newWord);
      setMessage(response.data.message);
      setNewWord({ telugu: '', meaning: '', partOfSpeech: '' });
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error adding word');
    }
  };

  return (
    <div className="App">
      <h1>Telugu Dictionary</h1>
      
      {/* Search Section */}
      <div>
        <input
          type="text"
          placeholder="Search Telugu or English transliteration"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {result && (
          <div>
            {result.error ? (
              <p>{result.error}</p>
            ) : (
              <div>
                <p><strong>Word:</strong> {result.telugu}</p>
                <p><strong>Meaning:</strong> {result.meaning}</p>
                <p><strong>Part of Speech:</strong> {result.partOfSpeech}</p>
                <p><strong>Transliteration:</strong> {result.englishTransliteration}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Word Section */}
      <div>
        <h2>Add New Word</h2>
        <input
          type="text"
          placeholder="Telugu Word"
          value={newWord.telugu}
          onChange={(e) => setNewWord({ ...newWord, telugu: e.target.value })}
        />
        <input
          type="text"
          placeholder="Meaning"
          value={newWord.meaning}
          onChange={(e) => setNewWord({ ...newWord, meaning: e.target.value })}
        />
        <input
          type="text"
          placeholder="Part of Speech"
          value={newWord.partOfSpeech}
          onChange={(e) => setNewWord({ ...newWord, partOfSpeech: e.target.value })}
        />
        <button onClick={handleAddWord}>Add Word</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default App;
