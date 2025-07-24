// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("results");

  // Highlight matched text
  function highlightMatch(text, query) {
    if (!query) return text;
    const pattern = new RegExp(`(${query})`, "gi");
    return text.replace(pattern, `<span class="highlight">$1</span>`);
  }

  // Render matched entries
  function renderResults(filtered) {
    if (filtered.length === 0) {
      resultsContainer.innerHTML = "<p>No matches found.</p>";
      return;
    }

    let html = `
      <table>
        <thead>
          <tr>
            <th>Telugu</th>
            <th>Root</th>
            <th>IAST</th>
            <th>Meaning</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
    `;

    filtered.forEach(entry => {
      html += `
        <tr>
          <td>${highlightMatch(entry.scripts.telugu, searchInput.value)}</td>
          <td>${highlightMatch(entry.root, searchInput.value)}</td>
          <td>${highlightMatch(entry.scripts.iast, searchInput.value)}</td>
          <td>${highlightMatch(entry.meaning, searchInput.value)}</td>
          <td><span class="note">${entry.note || ""}</span></td>
        </tr>
      `;
    });

    html += `</tbody></table>`;
    resultsContainer.innerHTML = html;
  }

  // Filter logic
  function filterEntries(query) {
    const q = query.toLowerCase();
    return dictionary.filter(entry =>
      entry.root.toLowerCase().includes(q) ||
      entry.meaning.toLowerCase().includes(q) ||
      entry.scripts.telugu.includes(q) ||
      entry.scripts.iast.toLowerCase().includes(q)
    );
  }

  // Initial load
  renderResults(dictionary);

  // Event listener for input
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    const filtered = filterEntries(query);
    renderResults(filtered);
  });
});
