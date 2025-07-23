const dictionary = [
  {
    label: "n.",
    meaning: "language",
    note: "[native word]",
    scripts: {
      telugu: "నుడి",
      devanagari: "नुडि",
      kannada: "ನುಡಿ",
      tamil: "நுடி",
      iast: "nuḍi",
      ascii: "nudi"
    }
  },
  {
    label: "n.",
    meaning: "dictionary",
    note: "[word list]",
    scripts: {
      telugu: "తెల్లడి",
      devanagari: "तॆल्लडि",
      kannada: "ತೆಲ್ಲಡಿ",
      tamil: "தெல்லடி",
      iast: "tellaḍi",
      ascii: "telladi"
    }
  },
  {
    label: "n.",
    meaning: "vocabulary",
    note: "[collection of words]",
    scripts: {
      telugu: "మాటోలి",
      devanagari: "माटोली",
      kannada: "ಮಾಟೋಲಿ",
      tamil: "மாட்டோலி",
      iast: "māṭōli",
      ascii: "maatoli"
    }
  },
  {
    label: "n.",
    meaning: "education",
    note: "[learning process]",
    scripts: {
      telugu: "చదువు",
      devanagari: "चदुवु",
      kannada: "ಚದುವು",
      tamil: "சதுவு",
      iast: "chaduvu",
      ascii: "chaduvu"
    }
  },
  {
    label: "n.",
    meaning: "friend",
    note: "[native term]",
    scripts: {
      telugu: "నేస్తం",
      devanagari: "नेस्तं",
      kannada: "ನೇಸ್ತಂ",
      tamil: "நேஸ்தம்",
      iast: "nēstaṁ",
      ascii: "nestam"
    }
  },
  {
    label: "n.",
    meaning: "love",
    note: "[deep affection]",
    scripts: {
      telugu: "కూర్మి",
      devanagari: "कूर्मि",
      kannada: "ಕೂರ್ಮಿ",
      tamil: "கூர்மி",
      iast: "kūrmi",
      ascii: "kurmi"
    }
  },
  {
    label: "n.",
    meaning: "truth",
    note: "[reality]",
    scripts: {
      telugu: "నిక్కం",
      devanagari: "निक्कं",
      kannada: "ನಿಕ್ಕಂ",
      tamil: "நிக்கம்",
      iast: "nikkaṁ",
      ascii: "nikkam"
    }
  },
  {
    label: "n.",
    meaning: "protection",
    note: "[guarding]",
    scripts: {
      telugu: "కాపుదల",
      devanagari: "कापुदल",
      kannada: "ಕಾಪುದಲ",
      tamil: "காபுதல",
      iast: "kāpudala",
      ascii: "kapudala"
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
    entry.meaning.toLowerCase().includes(q)
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

  let html = `
    <table>
      <thead>
        <tr>
          <th>Word</th>
          <th>Transliteration</th>
          <th>Type</th>
          <th>Meaning</th>
        </tr>
      </thead>
      <tbody>
  `;

  results.forEach(entry => {
    const scriptText = entry.scripts[currentScript] || entry.scripts.iast;
    const translit = entry.scripts.iast || entry.scripts.ascii;
    const meaning = highlightMatch(entry.meaning, query);
    const label = entry.label || "";
    const note = entry.note ? ` <span class="note">${entry.note}</span>` : "";

    html += `
      <tr>
        <td>${highlightMatch(scriptText, query)}</td>
        <td>${highlightMatch(translit, query)}</td>
        <td>${label}</td>
        <td>${meaning}${note}</td>
      </tr>
    `;
  });

  html += "</tbody></table>";
  resultsDiv.innerHTML = html;
}
