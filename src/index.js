import { fillData, fillHeader } from './js/fillTableData';
import dataHandlers from './js/dataHandlers';
import headerListeners from './js/sorting';

window.onload = () => {
  fillHeader();
  fillData();
  dataHandlers();
  headerListeners();
};
