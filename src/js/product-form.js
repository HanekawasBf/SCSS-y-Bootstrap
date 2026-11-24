import { updateLowStockKpi } from './kpi.js';

const stateFor = (stock) => {
  if (stock === 0) return 'agotado';
  if (stock < 10) return 'bajo';
  return 'disponible';
};

function createRow({ sku, nombre, categoria, stock }) {
  const row = document.querySelector('#rowTemplate').content.cloneNode(true);
  const estado = stateFor(Number(stock));

  // textContent (nunca innerHTML) evita la inyección de HTML (XSS)
  Object.entries({ sku, nombre, categoria, stock }).forEach(([field, value]) => {
    row.querySelector(`[data-field="${field}"]`).textContent = value;
  });

  const badge = row.querySelector('.status-badge');
  badge.classList.add(`status-badge--${estado}`);
  badge.textContent = estado.charAt(0).toUpperCase() + estado.slice(1);
  return row;
}

export function initProductForm({ Modal, Toast }) {
  const form = document.querySelector('#productForm');
  const modal = Modal.getOrCreateInstance('#productModal');
  const toast = Toast.getOrCreateInstance('#saveToast');
  const tbody = document.querySelector('#productTable tbody');
  const search = document.querySelector('#searchInput');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      form.querySelector(':invalid')?.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    tbody.prepend(createRow(data));
    form.reset();
    form.classList.remove('was-validated');
    modal.hide();
    toast.show();

    updateLowStockKpi();
    search.dispatchEvent(new Event('input')); // reaplica el filtro activo
  });
}
