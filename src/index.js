import fillTableData from './js/fillTableData';
// import { filterSearch } from './js/filter';
import { pagination } from './js/pagination';

window.onload = () => {
  fillTableData();
  pagination(5);
  // filterSearch();
}
