const dictionary = {
  "భాష": {
    meaning: "Language",
    pos: "noun",
    example: "తెలుగు是一種 భాష.",
    synonyms: ["నుడి", "పార్లరు"],
    comment: "Communication tool"
  },
  "నుడి": {
    meaning: "Speech",
    pos: "noun",
    example: "ఆయన నుడి శ్రావ్యంగా ఉంది.",
    synonyms: ["పాట", "మాట"],
    comment: "Spoken expression"
  }
};

function highlight(text, term) {
  const re = new RegExp(`(${term})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}

function transliterate(input) {
  return input
    .replace(/bhaa/g, "భా")
    .replace(/bha/g, "భ")
    .replace(/sha/g, "ష")
    .replace(/cha/g, "చ")
    .replace(/aa/g, "ఆ")
    .replace(/a/g, "అ"); // Basic phonetic rules
}

function liveSearch() {
  const rawInput = document.getElementById('searchBox').value.trim();
  const input = rawInput.toLowerCase();
  const phonetic = transliterate(input);
  const container = document.getElementById('resultsContainer');
  container.innerHTML = '';

  if (!input) {
    container.innerHTML = '<p class="tip">Start typing to see results...</p>';
    return;
  }

  const results = Object.entries(dictionary).filter(([word, entry]) => {
    return [word, entry.meaning, entry.example, ...(entry.synonyms || [])]
      .some(field => field?.toLowerCase().includes(input) || field?.toLowerCase().includes(phonetic));
  });

  if (results.length === 0) {
    container.innerHTML = `<p class="tip">No results found for "${input}"</p>`;
    return;
  }

  results.forEach(([word, entry]) => {
    const matchTerm = input;
    const card = document.createElement('div');
    card.className = 'word-card';

    card.innerHTML = `
      <h2>${highlight(word, matchTerm)}</h2>
      <p class="pos">${entry.pos}</p>
      <p><strong>Meaning:</strong> ${highlight(entry.meaning, matchTerm)}</p>
      <p class="example">📘 <em>${highlight(entry.example, matchTerm)}</em></p>
      <p class="synonyms">🔁 <strong>Synonyms:</strong> ${entry.synonyms.map(s => highlight(s, matchTerm)).join(", ")}</p>
      <p class="comment">💬 <strong>Comment:</strong> ${entry.comment || '—'}</p>
    `;

    container.appendChild(card);
  });
}

function addWord() {
  const word = document.getElementById('newWord').value.trim();
  const meaning = document.getElementById('newMeaning').value.trim();
  const comment = document.getElementById('newComment').value.trim();
  const msg = document.getElementById('insertMsg');

  if (!word || !meaning) {
    msg.textContent = "❌ Word and meaning are required.";
    msg.style.color = "red";
    return;
  }

  if (dictionary[word]) {
    msg.textContent = `ℹ️ '${word}' already exists.`;
    msg.style.color = "orange";
    return;
  }

  dictionary[word] = {
    meaning,
    pos: "noun",
    example: "—",
    synonyms: [],
    comment
  };

  msg.textContent = `✅ '${word}' added.`;
  msg.style.color = "green";

  document.getElementById('newWord').value = "";
  document.getElementById('newMeaning').value = "";
  document.getElementById('newComment').value = "";
}
