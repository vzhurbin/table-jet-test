import { fillData, fillHeader } from './js/fillTableData';
import dataHandlers from './js/dataHandlers';
import { headerListeners } from './js/sorting';
// import { data } from './Data';

window.onload = () => {
  fillHeader();
  fillData();
  dataHandlers();
  headerListeners();
};
