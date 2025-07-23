const dictionary = [
  {
    telugu: "నుడి",
    transliteration: "Nuḍi",
    meaning: "Language"
  },
  {
    telugu: "మాటోలి",
    transliteration: "Māṭōli",
    meaning: "Vocabulary"
  },
  {
    telugu: "తెల్లడి",
    transliteration: "Tellaḍi",
    meaning: "Dictionary"
  },
  {
    telugu: "చదువు",
    transliteration: "Chaduvu",
    meaning: "Education"
  },
  {
    telugu: "నేస్తం",
    transliteration: "Nēstaṁ",
    meaning: "Friend"
  }
];

function highlightMatch(text, query) {
  const pattern = new RegExp(`(${query})`, "gi");
  return text.replace(pattern, `<span class="highlight">$1</span>`);
}

function searchDictionary(query) {
  const lowerQuery = query.toLowerCase();
  const results = dictionary.filter(entry =>
    entry.telugu.includes(query) ||
    entry.transliteration.toLowerCase().includes(lowerQuery) ||
    entry.meaning.toLowerCase().includes(lowerQuery)
  );

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (results.length === 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  results.forEach(entry => {
    const telugu = highlightMatch(entry.telugu, query);
    const translit = highlightMatch(entry.transliteration, query);
    const meaning = highlightMatch(entry.meaning, query);

    const div = document.createElement("div");
    div.className = "result";
    div.innerHTML = `
      <h3>${telugu}</h3>
      <p><strong>Transliteration:</strong> ${translit}</p>
      <p><strong>Meaning:</strong> ${meaning}</p>
    `;
    resultsDiv.appendChild(div);
  });
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchDictionary(e.target.value.trim());
});
