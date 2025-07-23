const dictionary = [
  {
    meaning: "Language",
    phonetic: ["nudi", "bhasha"],
    scripts: {
      telugu: "నుడి",
      devanagari: "नुडि",
      kannada: "ನುಡಿ",
      tamil: "நுடி",
      malayalam: "നുടി",
      bengali: "নুডি",
      gujarati: "નુડી",
      gurmukhi: "ਨੁਡੀ",
      odia: "ନୁଡି",
      iast: "nuḍi",
      ascii: "nudi"
    }
  },
  {
    meaning: "Vocabulary",
    phonetic: ["maatoli", "padakosha"],
    scripts: {
      telugu: "మాటోలి",
      devanagari: "माटोली",
      kannada: "ಮಾಟೋಲಿ",
      tamil: "மாட்டோலி",
      malayalam: "മാട്ടോളി",
      bengali: "মাটোলি",
      gujarati: "માટોલી",
      gurmukhi: "ਮਾਟੋਲੀ",
      odia: "ମାଟୋଲି",
      iast: "māṭōli",
      ascii: "maatoli"
    }
  },
  {
    meaning: "Friend",
    phonetic: ["nesta", "mitra"],
    scripts: {
      telugu: "నేస్తం",
      devanagari: "नेस्तं",
      kannada: "ನೇಸ್ತಂ",
      tamil: "நேஸ்தம்",
      malayalam: "നേഷ്തം",
      bengali: "নেস্তং",
      gujarati: "નેસ્તં",
      gurmukhi: "ਨੇਸਤੰ",
      odia: "ନେସ୍ତଂ",
      iast: "nēstaṁ",
      ascii: "nestam"
    }
  }
];

let currentScript = "telugu";

function highlightMatch(text, query) {
  if (!query) return text;
  const pattern = new RegExp(`(${query})`, "gi");
  return text.replace(pattern, `<span class="highlight">$1</span>`);
}

function matches(entry, query) {
  const q = query.toLowerCase();
  return (
    Object.values(entry.scripts).some(val => val.toLowerCase().includes(q)) ||
    entry.meaning.toLowerCase().includes(q) ||
    (entry.phonetic && entry.phonetic.some(p => p.toLowerCase().includes(q)))
  );
}

function render(entry, query) {
  const scriptText = entry.scripts[currentScript] || entry.scripts.iast;
  return `
    <div class="result">
      <h3>${highlightMatch(scriptText, query)}</h3>
      <p><strong>Meaning:</strong> ${highlightMatch(entry.meaning, query)}</p>
      <small>IAST: ${entry.scripts.iast} | ASCII: ${entry.scripts.ascii}</small>
    </div>
  `;
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
    resultsDiv.innerHTML += render(entry, query);
  });
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchDictionary(e.target.value.trim());
});

document.getElementById("scriptSelect").addEventListener("change", (e) => {
  currentScript = e.target.value;
  const query = document.getElementById("searchInput").value.trim();
  searchDictionary(query);
});
