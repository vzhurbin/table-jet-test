import sortColumn from './js/sortColumn';
import { fillTableData, headerListeners } from './js/fillTableData'

window.onload = () => {
  fillTableData();
  headerListeners();
}

