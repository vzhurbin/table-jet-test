import sortColumn from './js/sortColumn';
import { fillTableData, headerListeners } from './js/fillTableData'

const table = document.getElementById('table');
window.onload = () => {
  fillTableData(table);
  headerListeners();
}

