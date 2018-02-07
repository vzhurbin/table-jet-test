import { fillTableData, headerListeners } from './js/fillTableData';
import { filterSearch } from './js/filter';
import { pagination } from './js/pagination';

window.onload = () => {
  fillTableData();
  headerListeners();
  pagination(5);
  filterSearch();
}
