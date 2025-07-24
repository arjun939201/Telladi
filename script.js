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
