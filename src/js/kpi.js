// Reto 6: la tarjeta "Stock bajo" cuenta las filas con badge "bajo"
export function updateLowStockKpi() {
  const total = document.querySelectorAll('#productTable .status-badge--bajo').length;
  document.querySelector('#kpiLow').textContent = total;
}
