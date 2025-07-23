const dictionary = {
  "భాష": {
    meaning: "Language",
    pos: "noun",
    example: "తెలుగు是一種 భాష.",
    synonyms: ["నుడి", "పార్లరు"],
    comment: "A medium of communication."
  },
  "నుడి": {
    meaning: "Speech",
    pos: "noun",
    example: "ఆయన నుడి శ్రావ్యంగా ఉంది.",
    synonyms: ["మాట", "పాట"],
    comment: "Spoken expression or utterance."
  },
  "తెలుగు": {
    meaning: "Telugu (language)",
    pos: "proper noun",
    example: "తెలుగు ద్రావిడ భాషల కుటుంబానికి చెందినది.",
    synonyms: ["ఆంధ్ర", "తెలింగ"],
    comment: "Native language of Andhra Pradesh and Telangana."
  }
};

function highlight(text, term) {
  const re = new RegExp(`(${term})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}

function liveSearch() {
  const term = document.getElementById('searchBox').value.trim().toLowerCase();
  const container = document.getElementById('resultsContainer');
  container.innerHTML = '';

  if (!term) {
    container.innerHTML = '<p class="tip">🔍 Type a word above to begin searching.</p>';
    return;
  }

  const results = Object.entries(dictionary).filter(([word, data]) =>
    word.toLowerCase().includes(term) ||
    data.meaning.toLowerCase().includes(term) ||
    data.comment?.toLowerCase().includes(term) ||
    data.synonyms?.some(s => s.toLowerCase().includes(term)) ||
    data.example?.toLowerCase().includes(term)
  );

  if (results.length === 0) {
    container.innerHTML = `<p class="tip">❌ No match found for "<strong>${term}</strong>"</p>`;
    return;
  }

  results.forEach(([word, data]) => {
    const card = document.createElement('div');
    card.className = 'word-card';

    card.innerHTML = `
      <h2>${highlight(word, term)}</h2>
      <p class="pos"><strong>Part of speech:</strong> ${data.pos}</p>
      <p><strong>Meaning:</strong> ${highlight(data.meaning, term)}</p>
      <p class="example">📘 <em>${highlight(data.example, term)}</em></p>
      <p class="synonyms">🔁 <strong>Synonyms:</strong> ${data.synonyms.map(s => highlight(s, term)).join(", ")}</p>
      <p class="comment">💬 <strong>Comment:</strong> ${highlight(data.comment, term)}</p>
    `;
    container.appendChild(card);
  });
}
