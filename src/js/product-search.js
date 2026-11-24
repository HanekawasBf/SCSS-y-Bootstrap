// Reto 6: filtra las filas por SKU o nombre mientras se escribe
export function initProductSearch() {
  const input = document.querySelector('#searchInput');
  const noResults = document.querySelector('#noResults');
  const tbody = document.querySelector('#productTable tbody');

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    const rows = tbody.querySelectorAll('tr:not(#noResults)');
    let visible = 0;

    rows.forEach((row) => {
      const sku = row.children[0].textContent;
      const name = row.children[1].textContent;
      const match = `${sku} ${name}`.toLowerCase().includes(query);
      row.hidden = !match;
      if (match) visible += 1;
    });

    noResults.hidden = visible > 0;
  });
}
