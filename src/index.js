import { fillTableData, headerListeners } from './js/fillTableData';
import { filterSearch } from './js/filter'

window.onload = () => {
  fillTableData();
  headerListeners();
  filterSearch();
}
