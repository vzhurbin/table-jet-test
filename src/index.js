import { fillData, fillHeader } from './js/fillTableData';
import dataHandlers from './js/dataHandlers';
import headerListeners from './js/sorting';

window.onload = () => {
  fillHeader();
  fillData();
  dataHandlers(11); // rows per page, default = 10
  headerListeners();
};
