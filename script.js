function highlightMatch(text, query) {
  if (!query) return text;
  const pattern = new RegExp(`(${query})`, "gi");
  return text.replace(pattern, '<span class="highlight">$1</span>');
}

function matches(entry, query) {
  const q = query.toLowerCase();
  return (
    entry.root.toLowerCase().includes(q) ||
    (entry.scripts?.iast?.toLowerCase().includes(q)) ||
    (entry.scripts?.telugu?.includes(q)) ||
    entry.meaning.toLowerCase().includes(q) ||
    entry.label.toLowerCase().includes(q) ||
    (entry.note?.toLowerCase().includes(q))
  );
}

function renderResults(query) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  const filtered = dictionary.filter(entry => matches(entry, query));

  if (filtered.length === 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  let html = `
    <table>
      <thead>
        <tr>
          <th>Word (Telugu)</th>
          <th>Label + Transliteration</th>
          <th>Meaning</th>
        </tr>
      </thead>
      <tbody>
  `;

  filtered.forEach(entry => {
    const word = highlightMatch(entry.scripts?.telugu || entry.root, query);
    const translit = highlightMatch(entry.scripts?.iast || entry.root, query);
    const label = highlightMatch(entry.label || "", query);
    const meaning = highlightMatch(entry.meaning, query);
    const note = entry.note ? ` <span class="note">${highlightMatch(entry.note, query)}</span>` : "";

    html += `
      <tr>
        <td>${word}</td>
        <td>${label} – ${translit}</td>
        <td>${meaning}${note}</td>
      </tr>
    `;
  });

  html += "</tbody></table>";
  resultsDiv.innerHTML = html;
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  renderResults(e.target.value.trim());
});

// Show all on load
renderResults("");
