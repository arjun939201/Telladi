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

let recentWords = [];

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
    .replace(/a/g, "అ");
}

function updateRecent(word) {
  recentWords = recentWords.filter(w => w !== word);
  recentWords.unshift(word);
  if (recentWords.length > 5) recentWords.pop();
  const container = document.getElementById('recentWords');
  container.innerHTML = recentWords.map(w => `<span onclick="searchWord('${w}')">${w}</span>`).join("");
}

function liveSearch() {
  const rawInput = document.getElementById('searchBox').value.trim();
  if (rawInput) searchWord(rawInput);
  else document.getElementById('resultsContainer').innerHTML = '<p class="tip">Start typing to see results...</p>';
}

function searchWord(inputWord) {
  const input = inputWord.toLowerCase();
  const phonetic = transliterate(input);
  const container = document.getElementById('resultsContainer');
  container.innerHTML = '';
  updateRecent(inputWord);

  const results = Object.entries(dictionary).filter(([word, entry]) =>
    [word, entry.meaning, entry.example, ...(entry.synonyms || [])]
      .some(f => f?.toLowerCase().includes(input) || f?.toLowerCase().includes(phonetic))
  );

  if (!results.length) {
    container.innerHTML = `<p class="tip">No results found for "${inputWord}"</p>`;
    return;
  }

  results.forEach(([word, entry]) => {
    const card = document.createElement('div');
    card.className = 'word-card';

    card.innerHTML = `
      <h2>${highlight(word, input)}</h2>
      <p class="pos">${entry.pos}</p>
      <p><strong>Meaning:</strong> ${highlight(entry.meaning, input)}</p>
      <p class="example">📘 <em>${highlight(entry.example, input)}</em></p>
      <p class="synonyms">🔁 <strong>Synonyms:</strong> ${entry.synonyms.map(s => highlight(s, input)).join(", ")}</p>
      <p class="comment">💬 <strong>Comment:</strong> ${entry.comment || '—'}</p>
      <div class="word-actions">
        <button class="edit" onclick="editWord('${word}')">✏️ Edit</button>
        <button class="delete" onclick="deleteWord('${word}')">🗑️ Delete</button>
      </div>
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
    msg.textContent = "❌ Word and meaning required.";
    msg.style.color = "red";
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
  liveSearch();
}

function editWord(word) {
  const entry = dictionary[word];
  document.getElementById('newWord').value = word;
  document.getElementById('newMeaning').value = entry.meaning;
  document.getElementById('newComment').value = entry.comment;
  delete dictionary[word];
}

function deleteWord(word) {
  if (confirm(`Delete "${word}"?`)) {
    delete dictionary[word];
    liveSearch();
  }
}
