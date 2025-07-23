const dictionary = [
  {
    label: "n.",
    meaning: "language",
    note: "[native word]",
    root: "nudi",
    scripts: {
      telugu: "నుడి",
      iast: "nuḍi",
      hk: "nudi"
    }
  },
  {
    label: "n.",
    meaning: "dictionary",
    note: "[word list]",
    root: "telladi",
    scripts: {
      telugu: "తెల్లడి",
      iast: "tellaḍi",
      hk: "telladi"
    }
  },
  {
    label: "n.",
    meaning: "vocabulary",
    note: "[collection of words]",
    root: "maatoli",
    scripts: {
      telugu: "మాటోలి",
      iast: "māṭōli",
      hk: "maatoli"
    }
  },
  {
    label: "n.",
    meaning: "education",
    note: "[learning process]",
    root: "chaduvu",
    scripts: {
      telugu: "చదువు",
      iast: "chaduvu",
      hk: "chaduvu"
    }
  },
  {
    label: "n.",
    meaning: "friend",
    note: "[close person]",
    root: "nestam",
    scripts: {
      telugu: "నేస్తం",
      iast: "nēstaṁ",
      hk: "nestam"
    }
  },
  {
    label: "n.",
    meaning: "truth",
    note: "[reality]",
    root: "nikkam",
    scripts: {
      telugu: "నిక్కం",
      iast: "nikkaṁ",
      hk: "nikkam"
    }
  }
];

let currentScript = "tel"; // default = Telugu

function highlightMatch(text, query) {
  if (!query) return text;
  const pattern = new RegExp(`(${query})`, "gi");
  return text.replace(pattern, `<span class="highlight">$1</span>`);
}

function matches(entry, query) {
  const q = query.toLowerCase();
  return (
    entry.root.toLowerCase().includes(q) ||
    Object.values(entry.scripts).some(val => val.toLowerCase().includes(q)) ||
    entry.meaning.toLowerCase().includes(q)
  );
}

function transliterateFallback(root, targetScript) {
  if (!root) return "—";
  try {
    return IndiTrans.convert(root, "hk", targetScript);
  } catch {
    return root;
  }
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
    const root = entry.root;
    const translit = entry.scripts.iast || entry.scripts.hk || root;
    const label = entry.label || "";
    const note = entry.note ? `<span class="note">${entry.note}</span>` : "";
    let scriptWord = entry.scripts[currentScript];

    if (!scriptWord) {
      scriptWord = transliterateFallback(root, currentScript);
    }

    html += `
      <tr>
        <td>${highlightMatch(scriptWord, query)}</td>
        <td>${highlightMatch(translit, query)}</td>
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

document.getElementById("scriptSelect").addEventListener("change", (e) => {
  currentScript = e.target.value;
  const query = document.getElementById("searchInput").value.trim();
  searchDictionary(query);
});
