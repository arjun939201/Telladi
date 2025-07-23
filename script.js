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
  const input = document.getElementById('searchBox').value.trim().toLowerCase();
  const container = document.getElementById('resultsContainer');
  container.innerHTML = '';

  if (input === "") {
    container.innerHTML = '<p class="tip">Start typing to see results...</p>';
    return;
  }

  const results = [];

  for (const [word, entry] of Object.entries(dictionary)) {
    const foundInKey = word.toLowerCase().includes(input);
    const foundInMeaning = entry.meaning.toLowerCase().includes(input);
    const foundInExample = entry.example.toLowerCase().includes(input);
    const foundInSynonyms = entry.synonyms.some(syn => syn.toLowerCase().includes(input));

    if (foundInKey || foundInMeaning || foundInExample || foundInSynonyms) {
      results.push({ word, entry });
    }
  }

  if (results.length === 0) {
    container.innerHTML = `<p class="tip">No results found for "${input}"</p>`;
    return;
  }

  results.forEach(({ word, entry }) => {
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
