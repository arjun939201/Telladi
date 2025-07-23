const dictionary = {
  "భాష": {
    meaning: "Language",
    pos: "noun",
    example: "తెలుగు是一種 భాష.",
    synonyms: ["నుడి", "పార్లరు"]
  },
  "చదువు": {
    meaning: "Education",
    pos: "noun",
    example: "చదువు జీవితాన్ని మెరుగుపరుస్తుంది.",
    synonyms: ["పాఠం", "శిక్షణ"]
  },
  "నుడి": {
    meaning: "Speech",
    pos: "noun",
    example: "ఆయన నుడి శ్రావ్యంగా ఉంది.",
    synonyms: ["పాట", "మాట"]
  },
  "మాట": {
    meaning: "Word",
    pos: "noun",
    example: "ప్రతి మాటకీ విలువ ఉంది.",
    synonyms: ["పదం", "వాక్యం"]
  }
};

function liveSearch() {
  const input = document.getElementById('searchBox').value.trim();
  const container = document.getElementById('resultsContainer');
  container.innerHTML = '';

  if (input.length === 0) {
    container.innerHTML = '<p class="tip">Start typing to see results...</p>';
    return;
  }

  const results = Object.keys(dictionary).filter(word => word.includes(input));

  if (results.length === 0) {
    container.innerHTML = `<p class="tip">No results found for "${input}"</p>`;
    return;
  }

  results.forEach(word => {
    const entry = dictionary[word];
    const card = document.createElement('div');
    card.className = 'word-card';

    card.innerHTML = `
      <h2>${word}</h2>
      <p class="pos">${entry.pos}</p>
      <p><strong>Meaning:</strong> ${entry.meaning}</p>
      <p class="example">📘 <em>${entry.example}</em></p>
      <p class="synonyms">🔁 <strong>Synonyms:</strong> ${entry.synonyms.join(", ")}</p>
    `;

    container.appendChild(card);
  });
}
