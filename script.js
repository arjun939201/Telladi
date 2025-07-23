const dictionary = [
  {
    label: "n.",
    meaning: "language",
    note: "[native]",
    root: "nudi",
    scripts: {
      telugu: "నుడి",
      iast: "nuḍi"
    }
  },
  {
    label: "n.",
    meaning: "dictionary",
    note: "[word list]",
    root: "telladi",
    scripts: {
      telugu: "తెల్లడి",
      iast: "tellaḍi"
    }
  },
  {
    label: "n.",
    meaning: "vocabulary",
    note: "[collection of words]",
    root: "maatoli",
    scripts: {
      telugu: "మాటోలి",
      iast: "māṭōli"
    }
  },
  {
    label: "n.",
    meaning: "education",
    note: "[learning process]",
    root: "chaduvu",
    scripts: {
      telugu: "చదువు",
      iast: "chaduvu"
    }
  },
  {
    label: "n.",
    meaning: "friend",
    note: "[close person]",
    root: "nestam",
    scripts: {
      telugu: "నేస్తం",
      iast: "nēstaṁ"
    }
  },
  {
    label: "n.",
    meaning: "truth",
    note: "[reality]",
    root: "nikkam",
    scripts: {
      telugu: "నిక్కం",
      iast: "nikkaṁ"
    }
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
    entry.root.toLowerCase().includes(q) ||
    entry.scripts.iast.toLowerCase().includes(q) ||
    entry.scripts.telugu.includes(q) ||
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
    const teluguWord = entry.scripts.telugu;
    const transliteration = entry.scripts.iast;
    const label = entry.label || "";
    const note = entry.note ? `<span class="note">${entry.note}</span>` : "";

    html += `
      <tr>
        <td>${highlightMatch(teluguWord, query)}</td>
        <td>${highlightMatch(transliteration, query)}</td>
        <td>${label}</td>
        <td>${highlightMatch(entry.meaning, query)} ${note}</td>
      </tr>
    `;
  });

  html += "</tbody></table>";
  resultsDiv.innerHTML = html;
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchDictionary(e.target.value.trim());
});
