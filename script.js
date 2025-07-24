// Utility to escape special characters in user input for RegExp
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Highlights matched query in a given text
function highlightMatch(text, query) {
  if (!query) return text;
  const pattern = new RegExp(`(${escapeRegExp(query)})`, "gi");
  return text.replace(pattern, '<span class="highlight">$1</span>');
}

// Checks if dictionary entry matches the search query
function matches(entry, query) {
  const q = query.toLowerCase();
  return (
    entry.root.toLowerCase().includes(q) ||
    entry.scripts.iast.toLowerCase().includes(q) ||
    entry.scripts.telugu.includes(q) ||
    entry.meaning.toLowerCase().includes(q)
  );
}

// Main function to search and display dictionary results
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

// Event listener for search input
document.getElementById("searchInput").addEventListener("input", (e) => {
  searchDictionary(e.target.value.trim());
});

// Event listener for POS dropdown
document.getElementById("posFilter").addEventListener("change", () => {
  const query = document.getElementById("searchInput").value.trim();
  searchDictionary(query);
});
