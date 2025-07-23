const dictionary = [
  {
    root: "nudi",
    label: "n.",
    meaning: "language",
    note: "[native]",
    scripts: {
      telugu: "నుడి",
      iast: "nuḍi"
    }
  },
  {
    root: "telladi",
    label: "n.",
    meaning: "dictionary",
    note: "[word list]",
    scripts: {
      telugu: "తెల్లడి",
      iast: "tellaḍi"
    }
  },
  {
    root: "maatoli",
    label: "n.",
    meaning: "vocabulary",
    note: "[collection of words]",
    scripts: {
      telugu: "మాటోలి",
      iast: "māṭōli"
    }
  },
  {
    root: "chaduvu",
    label: "n.",
    meaning: "education",
    note: "[learning process]",
    scripts: {
      telugu: "చదువు",
      iast: "chaduvu"
    }
  },
  {
    root: "nestam",
    label: "n.",
    meaning: "friend",
    note: "[close person]",
    scripts: {
      telugu: "నేస్తం",
      iast: "nēstaṁ"
    }
  },
  {
    root: "nikkam",
    label: "n.",
    meaning: "truth",
    note: "[reality]",
    scripts: {
      telugu: "నిక్కం",
      iast: "nikkaṁ"
    }
  },
  {
    root: "premincu",
    label: "v.",
    meaning: "to love",
    note: "[verb]",
    scripts: {
      telugu: "ప్రేమించు",
      iast: "premincu"
    }
  },
  {
    root: "andam",
    label: "adj.",
    meaning: "beautiful",
    note: "[quality]",
    scripts: {
      telugu: "అందం",
      iast: "andam"
    }
  },
  {
  root: "bāgu",
  label: "n.",
  meaning: "health",
  note: "[well-being]",
  scripts: {
    telugu: "బాగు",
    iast: "bāgu"
  }
},
{
  root: "tiṇḍi",
  label: "n.",
  meaning: "food",
  note: "[eatable]",
  scripts: {
    telugu: "తిండి",
    iast: "tiṇḍi"
  }
},
{
  root: "nīḷḷu",
  label: "n.",
  meaning: "water",
  note: "[liquid]",
  scripts: {
    telugu: "నీళ్ళు",
    iast: "nīḷḷu"
  }
},
{
  root: "kūrmi",
  label: "n.",
  meaning: "love",
  note: "[affection]",
  scripts: {
    telugu: "కూర్మి",
    iast: "kūrmi"
  }
},
{
  root: "nesaru",
  label: "n.",
  meaning: "sun",
  note: "[daylight giver]",
  scripts: {
    telugu: "నెసరు",
    iast: "nesaru"
  }
},
{
  root: "nela",
  label: "n.",
  meaning: "moon",
  note: "[night light]",
  scripts: {
    telugu: "నెల",
    iast: "nela"
  }
},
{
  root: "nēla",
  label: "n.",
  meaning: "earth",
  note: "[ground]",
  scripts: {
    telugu: "నేల",
    iast: "nēla"
  }
},
{
  root: "ningi",
  label: "n.",
  meaning: "sky",
  note: "[atmosphere]",
  scripts: {
    telugu: "నింగి",
    iast: "ningi"
  }
},
{
  root: "konda",
  label: "n.",
  meaning: "mountain",
  note: "[elevation]",
  scripts: {
    telugu: "కొండ",
    iast: "koṇḍa"
  }
},
{
  root: "eru",
  label: "n.",
  meaning: "river",
  note: "[stream]",
  scripts: {
    telugu: "ఏరు",
    iast: "ēru"
  }
},
{
  root: "aḍavi",
  label: "n.",
  meaning: "forest",
  note: "[woods]",
  scripts: {
    telugu: "అడవి",
    iast: "aḍavi"
  }
},
{
  root: "lekka",
  label: "n.",
  meaning: "math",
  note: "[counting]",
  scripts: {
    telugu: "లెక్క",
    iast: "lekka"
  }
},
{
  root: "chekundaṁ",
  label: "n.",
  meaning: "art",
  note: "[creative work]",
  scripts: {
    telugu: "చెకుందం",
    iast: "cekundaṁ"
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

  const selectedPOS = document.getElementById("posFilter").value;

  const results = dictionary.filter(entry => {
    const match = matches(entry, query);
    const posMatch = selectedPOS === "all" || entry.label === selectedPOS;
    return match && posMatch;
  });

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
    const teluguWord = entry.scripts.telugu || entry.root;
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

document.getElementById("posFilter").addEventListener("change", () => {
  const query = document.getElementById("searchInput").value.trim();
  searchDictionary(query);
});
