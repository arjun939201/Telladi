const dictionary = [
  {
    telugu: "నుడి",
    transliteration: "Nuḍi",
    meaning: "Language",
    phonetic: ["nudi", "nuti"]
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
  if (!query) return text;
  const pattern = new RegExp(`(${query})`, "gi");
  return text.replace(pattern, `<span class="highlight">$1</span>`);
}

function matches(entry, query) {
  const q = query.toLowerCase();
  return (
    entry.telugu.includes(query) ||
    entry.transliteration.toLowerCase().includes(q) ||
    entry.meaning.toLowerCase().includes(q) ||
    (Array.isArray(entry.phonetic) &&
     entry.phonetic.some(p => p.toLowerCase().includes(q)))
  );
}

function searchDictionary(query) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!query) return;

  const results = dictionary.filter(entry => matches(entry, query));

  if (results.length === 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  results.forEach(entry => {
    const div = document.createElement("div");
    div.className = "result";

    div.innerHTML = `
      <h3>${highlightMatch(entry.telugu, query)}</h3>
      <p><strong>Transliteration:</strong> ${highlightMatch(entry.transliteration, query)}</p>
      <p><strong>Meaning:</strong> ${highlightMatch(entry.meaning, query)}</p>
    `;

    resultsDiv.appendChild(div);
  });
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchDictionary(e.target.value.trim());
});
