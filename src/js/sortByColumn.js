import { createRows, fillTableData } from './fillTableData';
import dataHandlers from './dataHandlers';

const sortByColumn = () => {
  const table = document.getElementById('table');
  const thArray = [...table.querySelectorAll('th')];
  thArray.forEach(th => {
    // const header = document.getElementById(`header-${i}`);
    th.addEventListener('click', e => {
      const rows = createRows(th.className);
      fillTableData(rows);
      dataHandlers();
    });
  });
};

export default sortByColumn;
