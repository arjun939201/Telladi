const dictionary = [
  {
    label: "f.",
    meaning: "similarity",
    note: "[comparison]",
    scripts: {
      telugu: "ఉపమా",
      devanagari: "उपमा",
      kannada: "ಉಪಮಾ",
      tamil: "உபமா",
      iast: "upamā",
      ascii: "upama"
    }
  },
  {
    label: "adj.",
    meaning: "belligerent",
    note: "[engaged in war]",
    scripts: {
      telugu: "యుద్ధరతి",
      devanagari: "युद्धरति",
      kannada: "ಯುದ್ಧರತಿ",
      tamil: "யுத்தரதி",
      iast: "yuddharati",
      ascii: "yuddharati"
    }
  },
  {
    label: "m.",
    meaning: "bench",
    note: "[Law, judges collectively]",
    scripts: {
      telugu: "న్యాయాధీశ-గణం",
      devanagari: "न्यायाधीश-गण",
      kannada: "ನ್ಯಾಯಾಧೀಶ-ಗಣ",
      tamil: "நியாயாதீச-கணம்",
      iast: "nyāyādhīśa-gaṇa",
      ascii: "nyAyAdhIsha-gaNa"
    }
  },
  {
    label: "n.",
    meaning: "tyranny",
    note: "[pol.]",
    scripts: {
      telugu: "మ్లేచ్ఛిత",
      devanagari: "म्लेच्छित",
      kannada: "ಮ್ಲೆಚ್ಛಿತ",
      tamil: "ம்லெச்சித",
      iast: "mlecchita",
      ascii: "mlecchita"
    }
  },
  {
    label: "n.",
    meaning: "archaeology",
    note: "[brit.]",
    scripts: {
      telugu: "పురాతత్వశాస్త్రం",
      devanagari: "पुरातत्वशास्त्र",
      kannada: "ಪುರಾತತ್ವಶಾಸ್ತ್ರ",
      tamil: "புராதத்துவசாஸ்திரம்",
      iast: "purātattvaśāstra",
      ascii: "purAtatvashAstra"
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
          <th>Type</th>
          <th>Transliteration</th>
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
        <td>${label}</td>
        <td>${highlightMatch(translit, query)}</td>
        <td>${meaning}${note}</td>
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
