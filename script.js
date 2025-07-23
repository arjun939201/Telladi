const dictionary = [
  {
    telugu: "నుడి",
    transliteration: "Nuḍi",
    meaning: "Language",
    phonetic: ["nudi", "nudi", "nuti"]
  },
  {
    telugu: "మాటోలి",
    transliteration: "Māṭōli",
    meaning: "Vocabulary",
    phonetic: ["matoli", "maatoli"]
  },
  {
    telugu: "తెల్లడి",
    transliteration: "Tellaḍi",
    meaning: "Dictionary",
    phonetic: ["telladi", "teladi"]
  },
  {
    telugu: "చదువు",
    transliteration: "Chaduvu",
    meaning: "Education",
    phonetic: ["chaduvu", "chadhuvu"]
  },
  {
    telugu: "నేస్తం",
    transliteration: "Nēstaṁ",
    meaning: "Friend",
    phonetic: ["nestam", "nesta"]
  },
  {
    telugu: "భాష",
    transliteration: "Bhāṣa",
    meaning: "Language",
    phonetic: ["bhasha", "bhaasha", "basa"]
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
    entry.meaning.toLowerCase().includes(lowerQuery) ||
    (entry.phonetic && entry.phonetic.some(p => p.includes(lowerQuery)))
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
