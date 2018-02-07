import fillTableData from './js/fillTableData';
// import { filterSearch } from './js/filter';
import dataHandlers from './js/dataHandlers';

window.onload = () => {
  fillTableData();
  dataHandlers();
}
